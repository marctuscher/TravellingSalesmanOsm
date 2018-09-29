#include "webserver.h"
#include "search.h"
#include "graphreader.h"
#include "graph.h"
#include "result.h"
#include "dynprog.h"
#include <boost/foreach.hpp>





inline ptree path_to_ptree(vector<Node> path){
  ptree path_tree;
  for (u_int i = 0; i < path.size(); i++){
    ptree child;
    child.put("lat", path[i].lati);
    child.put("lon", path[i].loni);
    path_tree.push_back(std::make_pair("", child));
  }
  return path_tree;
}
template <typename T>
std::vector<T> as_vector(ptree const& pt, ptree::key_type const& key)
{
    std::vector<T> r;
    for (auto& item : pt.get_child(key))
        r.push_back(item.second.get_value<T>());
    return r;
}

std::vector<int> getTargets(ptree const& pt, Graph* g){
  vector<int> targets;
  for (const ptree::value_type& item: pt.get_child("targets")){
    int type = item.second.get<int>("type");
    int nodeId = -1;
    if (type == 0){
      string group = item.second.get<string>("group");
      string cat = item.second.get<string>("cat");
      double currentLat = item.second.get<double>("currentLat");
      double currentLon = item.second.get<double>("currentLon");
      nodeId = g->findNodeByCategory(group, cat, currentLat, currentLon);
    }else{
      double lat = item.second.get<double>("lat");
      double lon = item.second.get<double>("lng");
      nodeId = g->findNode(lat, lon);
    }
    cout << "found node by coordinate: " << nodeId << endl;
    targets.push_back(nodeId);
  }
  return targets;
}

map<string, vector<string>> read_json_config(ptree pt){
  map<string, vector<string>> categories; 
  for (auto it: pt){
    categories.insert(pair<string, vector<string>>(it.first, as_vector<string>(pt, it.first)));
  }
  return categories;
} 

void Webserver::run_server(char* filename, char* config_file){
  GraphReader reader;
  static Graph g;
  static ptree cat_pt;
  ifstream file(config_file);
  read_json(file, cat_pt);
  map<string, vector<string>> categories = read_json_config(cat_pt);
  reader.read(&g, filename, false, categories);
  static HttpServer server;
  static DynProg dyn(&g);
  Search search(&g);
  server.config.port = 8080;

  server.default_resource["GET"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      auto web_root_path = boost::filesystem::canonical("static");
      auto path = boost::filesystem::canonical(web_root_path / request->path);
      if(distance(web_root_path.begin(), web_root_path.end()) > distance(path.begin(), path.end()) ||
         !equal(web_root_path.begin(), web_root_path.end(), path.begin()))
        throw invalid_argument("path must be within root path");
      if(boost::filesystem::is_directory(path))
        path /= "index.html";

      SimpleWeb::CaseInsensitiveMultimap header;
      auto ifs = make_shared<ifstream>();
      ifs->open(path.string(), ifstream::in | ios::binary | ios::ate);

      if(*ifs) {
        auto length = ifs->tellg();
        ifs->seekg(0, ios::beg);

        header.emplace("Content-Length", to_string(length));
        response->write(header);

        class FileServer {
        public:
          static void read_and_send(const shared_ptr<HttpServer::Response> &response, const shared_ptr<ifstream> &ifs) {
            static vector<char> buffer(131072);
            streamsize read_length;
            if((read_length = ifs->read(&buffer[0], static_cast<streamsize>(buffer.size())).gcount()) > 0) {
              response->write(&buffer[0], read_length);
              if(read_length == static_cast<streamsize>(buffer.size())) {
                response->send([response, ifs](const SimpleWeb::error_code &ec) {
                  if(!ec)
                    read_and_send(response, ifs);
                  else
                    cerr << "Connection interrupted" << endl;
                });
              }
            }
          }
        };
        FileServer::read_and_send(response, ifs);
      }
      else
        throw invalid_argument("could not read file");
    }
    catch(const exception &e) {
      response->write(SimpleWeb::StatusCode::client_error_bad_request, "Could not open path " + request->path + ": " + e.what());
    }
  };

  
  server.resource["^/routebynodeid$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      Search search(&g);
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);

      std::ostringstream oss;
      string resultJson;
      int srcIDX = pt.get<int>("srcNode");
      int trgIDX = pt.get<int>("trgNode");
      std::cout << "source node: " << srcIDX<< "traget: " << trgIDX <<std::endl;
      Result searchResult = search.oneToOne(srcIDX,trgIDX);
      pt.add_child("path", path_to_ptree(searchResult.path));
      pt.put("distance", searchResult.distance);
      write_json(oss, pt);
      std::string jsonString = oss.str();
      std::cout << jsonString << std::endl;
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
      << e.what();
    }
  };
  server.resource["^/categories$"]["GET"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {

      std::ostringstream oss;
      write_json(oss, cat_pt);
      std::string jsonString = oss.str();
      std::cout << jsonString << std::endl;
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
      << e.what();
    }
  };

  server.resource["^/routebycoordinates$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      Search search(&g);
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);
      std::ostringstream oss;
      string resultJson;
      string sourceMode = pt.get<string>("sourceMode");
      string targetMode = pt.get<string>("targetMode");
      vector<Node> markers;
      int trgIDX = -1;
      int srcIDX = -1;
      int internalSourceIDX;
      int internalTargetIDX;
      if (sourceMode == "category"){
        srcIDX = g.findNodeByCategory(pt.get<string>("sourceGroup"), pt.get<string>("sourceCat"), pt.get<double>("sourceOriginLat"), pt.get<double>("sourceOriginLon"));
        internalSourceIDX = g.findNode(g.nodes[srcIDX].lati, g.nodes[srcIDX].loni);
        markers.push_back(g.nodes[srcIDX]);
      }else{
        internalSourceIDX = g.findNode(pt.get<double>("sourceLat"), pt.get<double>("sourceLon"));
      }
      if (targetMode == "category"){
        string targetGroup = pt.get<string>("targetGroup");
        string targetCat = pt.get<string>("targetCat");
        double targetOriginLat = pt.get<double>("targetOriginLat");
        double targetOriginLon = pt.get<double>("targetOriginLon");
        trgIDX = g.findNodeByCategory(targetGroup, targetCat, targetOriginLat, targetOriginLon);
        internalTargetIDX = g.findNode(g.nodes[trgIDX].lati, g.nodes[trgIDX].loni);
        markers.push_back(g.nodes[trgIDX]);
      }else{
        internalTargetIDX = g.findNode(pt.get<double>("targetLat"), pt.get<double>("targetLon"));
      }
      // TODO error handling
      Result searchResult = search.oneToOne(internalSourceIDX, internalTargetIDX);
      pt.add_child("path", path_to_ptree(searchResult.path));
      pt.put("distance", searchResult.distance);
      write_json(oss, pt);
      std::string jsonString = oss.str();
      std::cout << jsonString << std::endl;
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
                << e.what();
    }
  };
  server.on_error = [](shared_ptr<HttpServer::Request> /*request*/, const SimpleWeb::error_code & /*ec*/) {
  };
  server.resource["^/tspheldkarp$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);
      std::ostringstream oss;
      string resultJson;
      vector <int> targets = getTargets(pt, &g);
      map<int, map<int, Result>> distances = dyn.calcDistances(targets);
      vector<Node> path = dyn.heldKarp(distances);
      pt.add_child("path", path_to_ptree(path));
      write_json(std::cout,pt);
      write_json(oss, pt);
      std::string jsonString = oss.str();
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
                << e.what();
    }
  };
  thread server_thread([]() {
      // Start server
      std::cout<<"Start Webserver on port " << server.config.port << std::endl;
      server.start();
    });
  server_thread.join();
}






