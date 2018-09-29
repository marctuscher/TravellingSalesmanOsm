#include <iostream>
#include "graphreader.h"
#include "graph.h"
#include <sstream>
#include <string>
#include <cstring>
#include "search.h"
#include <chrono>
#include "webserver.h"


int main (int argc, char* argv[]){
  Webserver::run_server(argv[1], argv[2]);
}
