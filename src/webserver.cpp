#include "webserver.h"
#include "search.h"
#include "graphreader.h"
#include "graph.h"
#include "result.h"



inline ptree path_to_ptree(Result res){
  ptree path;
  for (int i = 0; i < res.path.size(); i++){
    ptree child;
    child.put("lat", res.path[i].lati);
    child.put("lon", res.path[i].loni);
    path.push_back(std::make_pair("", child));
  }
  return path;
}

void Webserver::run_server(char* filename){
  GraphReader reader;
  static Graph g;
  reader.read(&g, filename, false);
  static HttpServer server;
  static Search search(&g);
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
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);

      std::ostringstream oss;
      string resultJson;
      int srcIDX = pt.get<int>("srcNode");
      int trgIDX = pt.get<int>("trgNode");
      std::cout << "source node: " << srcIDX<< "traget: " << trgIDX <<std::endl;
      Result searchResult = search.dijkstra(srcIDX,trgIDX);
      pt.add_child("path", path_to_ptree(searchResult));
      pt.put("distance", searchResult.distance);

      std::cout << "disctace: " << searchResult.distance <<std::endl;
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
  server.resource["^/routebycoordinate$"]["POST"] = [](shared_ptr<HttpServer::Response> response, shared_ptr<HttpServer::Request> request) {
    try {
      std::cout << "Post json"<< std::endl;
      ptree pt;
      read_json(request->content, pt);

      std::ostringstream oss;


      string resultJson;
      int srcIDX = g.findNode(pt.get<double>("srcLongitude"), pt.get<double>("srcLatitude"));
      int trgIDX = g.findNode(pt.get<double>("trgLongitude"), pt.get<double>("trgLatitude"));
      if ( srcIDX != -1 && trgIDX !=-1){
        search.dijkstra(srcIDX,trgIDX);
        pt.put("error", false);
      } else{
        pt.put("error", true);
        pt.put("errorMessage", "could not find a nodeid");
      }
      //pt.add_child("nodes", alg.getPath(trgIDX));

      write_json(std::cout,pt);

      write_json(oss, pt);

      std::string jsonString = oss.str();
      std::cout << jsonString << std::endl;
      *response << jsonString;
    }
    catch(const exception &e) {
      *response << "HTTP/1.1 400 Bad Request\r\nContent-Length: " << strlen(e.what()) << "\r\n\r\n"
                << e.what();
    }
  };
  server.on_error = [](shared_ptr<HttpServer::Request> /*request*/, const SimpleWeb::error_code & /*ec*/) {
  };
  thread server_thread([&server]() {
      // Start server
      std::cout<<"Start Webserver" << std::endl;
      server.start();
    });
  server_thread.join();
}






