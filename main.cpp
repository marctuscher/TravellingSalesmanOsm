#include <iostream>
#include "graphreader.h"
#include "graph.h"
#include <sstream>
#include <string>
#include <cstring>
#include "search.h"

int main (int argc, char* argv[]){
  GraphReader reader;
  Graph graph;
  char filename[50];
  std::strcpy (filename, getenv("DATA_DIR_FAPRA"));
  std::strcat (filename, "hamburg-latest.osm.pbf");
  reader.read(&graph, filename, false);
  std::cout << graph.nodes.size() << std::endl;
  Search search(&graph);
  std::cout << graph.edges[0].src << std::endl;
  std::cout << graph.edges[0].trg << std::endl;
  std::cout << graph.edges[0].cost << std::endl;
  std::cout << "Distanz: " << search.dijkstra(std::stoi(argv[1]), std::stoi(argv[2])) << std::endl;
}
