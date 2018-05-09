#include <iostream>
#include "graphreader.h"
#include "graph.h"
#include <sstream>
#include <string>
#include <cstring>

int main (){
  GraphReader reader;
  Graph graph;
  char filename[50];
  std::strcpy (filename, getenv("DATA_DIR_FAPRA"));
  std::strcat (filename, "hamburg-latest.osm.pbf");
  reader.read(&graph, filename, true);
}