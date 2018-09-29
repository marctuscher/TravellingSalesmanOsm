#ifndef WEBSERVER_H
#define WEBSERVER_H
#include "client_http.hpp"
#include "server_http.hpp"
#include "graph.h"
#define BOOST_SPIRIT_THREADSAFE
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/ini_parser.hpp>
#include <algorithm>
#include <boost/filesystem.hpp>
#include <fstream>
#include <vector>
#include <stdio.h>
#include <iomanip>


using namespace std;
using namespace boost::property_tree;
using HttpServer = SimpleWeb::Server<SimpleWeb::HTTP>;


class Webserver
{
 public:
  static void run_server(char * filename, char* config_file);
};

#endif// WEBSERVER_H
