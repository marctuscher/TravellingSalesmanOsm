#include "webserver.h"
#include "search.h"
#include "graphreader.h"
#include "graph.h"
#include "result.h"
#include "dynprog.h"
#include <boost/foreach.hpp>





ptree markers_to_ptree(vector<Node> markers){
  ptree marker_tree;
  for (auto marker: markers){
    ptree child;
    child.put("lat", marker.lati);
    child.put("lon", marker.loni);
    ptree tags;
    for (auto tag: marker.tags){
      tags.put(tag.first, tag.second);
    }
    child.add_child("tags",tags);
    marker_tree.push_back(make_pair("", child));
  }
  return marker_tree;
}


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

pair<vector<int>, vector<Node>> getTargets(ptree const& pt, Graph* g){
  vector<int> targets;
  vector<Node> markers;
  for (const ptree::value_type& item: pt.get_child("targets")){
    string mode = item.second.get<string>("mode");
    if(mode == "category"){
      string group = item.second.get<string>("group");
      string cat = item.second.get<string>("category");
      double currentLat = item.second.get<double>("originLat");
      double currentLon = item.second.get<double>("originLon");
      double numberOfElem = item.second.get<int>("numberOfElem");
      vector<int> alreadyFound;
      for (int i = 0; i < numberOfElem; i++){
        int tmpNodeId = g->findNodeByCategory(group, cat, currentLat, currentLon, &alreadyFound);
        if (tmpNodeId != -1) alreadyFound.push_back(tmpNodeId);
      }
      for (auto markerNodeId: alreadyFound){
        markers.push_back(g->nodes[markerNodeId]);
        targets.push_back(g->findNode(g->nodes[markerNodeId].lati, g->nodes[markerNodeId].loni));
      }
    }else{
      double lat = item.second.get<double>("lat");
      double lon = item.second.get<double>("lng");
      targets.push_back(g->findNode(lat, lon));
    }
  }
  return pair<vector<int>, vector<Node>>(targets, markers);
}

vector<Node> getMarkers(ptree const& pt, Graph* g){
  vector<Node> markers;
  for (const ptree::value_type& item: pt.get_child("targets")){
      string group = item.second.get<string>("group");
      string cat = item.second.get<string>("category");
      double currentLat = item.second.get<double>("originLat");
      double currentLon = item.second.get<double>("originLon");
      double numberOfElem = item.second.get<int>("numberOfElem");
      vector<int> alreadyFound;
      for (int i = 0; i < numberOfElem; i++){
        int tmpNodeId = g->findNodeByCategory(group, cat, currentLat, currentLon, &alreadyFound);
        if (tmpNodeId != -1) alreadyFound.push_back(tmpNodeId);
      }
      for (auto markerNodeId: alreadyFound){
        markers.push_back(g->nodes[markerNodeId]);
      }
  }
  return markers;
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
      auto web_root_path = boost::filesystem::canonical("../static");
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
      vector<int> alreadyFound;

      std::chrono::high_resolution_clock::time_point localization_t1 = std::chrono::high_resolution_clock::now();
      if (sourceMode == "category"){
        srcIDX = g.findNodeByCategory(pt.get<string>("sourceGroup"), pt.get<string>("sourceCat"), pt.get<double>("sourceOriginLat"), pt.get<double>("sourceOriginLon"), &alreadyFound);
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
        trgIDX = g.findNodeByCategory(targetGroup, targetCat, targetOriginLat, targetOriginLon, &alreadyFound);
        internalTargetIDX = g.findNode(g.nodes[trgIDX].lati, g.nodes[trgIDX].loni);
        markers.push_back(g.nodes[trgIDX]);
      }else{
        internalTargetIDX = g.findNode(pt.get<double>("targetLat"), pt.get<double>("targetLon"));
      }
      // TODO error handling
      std::chrono::high_resolution_clock::time_point localization_t2 = std::chrono::high_resolution_clock::now();
      auto durationLocalization = std::chrono::duration_cast<std::chrono::microseconds>( localization_t2 - localization_t1 ).count();
      pt.put("duration:localization", durationLocalization);
      std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
      Result searchResult;
      search.oneToOne(internalSourceIDX, internalTargetIDX, &searchResult);
      if (searchResult.distance == -1){
        pt.put("error", "A path could not be found");
      }
      std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
      auto durationEdge = std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
      pt.put("duration:dijkstra", durationEdge);
      pt.add_child("markers", markers_to_ptree(markers));
      pt.add_child("path", path_to_ptree(searchResult.path));
      pt.put("costs", searchResult.distance);
      write_json(oss, pt);
      std::string jsonString = oss.str();
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
      std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
      pair<vector <int>, vector<Node>> targetsAndMarkers = getTargets(pt, &g);
      std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
      auto durationLocalization = std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
      pt.put("duration:localization", durationLocalization);
      
      map<int, map<int, Result>> distances;
      dyn.calcDistances(&(targetsAndMarkers.first), &distances);
      std::chrono::high_resolution_clock::time_point t3 = std::chrono::high_resolution_clock::now();
      auto durationDijkstra = std::chrono::duration_cast<std::chrono::microseconds>( t3 -t2 ).count();
      pt.put("duration:dijkstra", durationDijkstra);

      vector<Node> path;
      int costs = dyn.heldKarp(&distances, &path);
      std::chrono::high_resolution_clock::time_point t4 = std::chrono::high_resolution_clock::now();
      auto durationEdge = std::chrono::duration_cast<std::chrono::microseconds>( t4 - t3 ).count();
      pt.put("duration:compute", durationEdge);


      pt.put("costs", costs);
      pt.add_child("markers", markers_to_ptree(targetsAndMarkers.second));
      pt.add_child("path", path_to_ptree(path));
      write_json(oss, pt);
      std::string jsonString = oss.str();
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
                << e.what();
    }
  };
  server.resource["^/apx$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);
      std::ostringstream oss;
      string resultJson;

      std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
      pair<vector <int>, vector<Node>> targetsAndMarkers = getTargets(pt, &g);
      std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
      auto durationLocalization = std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
      pt.put("duration:localization", durationLocalization);
      map<int, map<int, Result>> distances;
      dyn.calcDistances(&(targetsAndMarkers.first), &distances);
      std::chrono::high_resolution_clock::time_point t3 = std::chrono::high_resolution_clock::now();
      auto durationDijkstra = std::chrono::duration_cast<std::chrono::microseconds>( t3 - t2 ).count();
      pt.put("duration:dijkstra", durationDijkstra);

      vector<Node> path;
      int costs = dyn.apx(&distances, &path);
      std::chrono::high_resolution_clock::time_point t4 = std::chrono::high_resolution_clock::now();
      auto durationEdge = std::chrono::duration_cast<std::chrono::microseconds>( t4 - t3 ).count();
      pt.put("duration:compute", durationEdge);

      pt.put("costs", costs);
      pt.add_child("markers", markers_to_ptree(targetsAndMarkers.second));
      pt.add_child("path", path_to_ptree(path));
      write_json(oss, pt);
      std::string jsonString = oss.str();
      *response << "HTTP/1.1 200 OK\r\nContent-Length: " << jsonString.length() << "\r\n\r\n" << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
                << e.what();
    }
  };
  server.resource["^/poi$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);
      std::ostringstream oss;
      string resultJson;
      std::chrono::high_resolution_clock::time_point localization_t1 = std::chrono::high_resolution_clock::now();
      vector<Node> markers = getMarkers(pt, &g);
      std::chrono::high_resolution_clock::time_point localization_t2 = std::chrono::high_resolution_clock::now();
      auto durationLocalization = std::chrono::duration_cast<std::chrono::microseconds>( localization_t2 - localization_t1 ).count();
      pt.put("duration:localization", durationLocalization);
      pt.add_child("markers", markers_to_ptree(markers));
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






