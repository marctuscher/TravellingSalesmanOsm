#include <iostream>
#include "graphreader.h"
#include "graph.h"
#include <sstream>
#include <string>
#include <cstring>
#include "search.h"
#include "dynprog.h"
#include <chrono>
#include "result.h"
#include <map>

using namespace std;

int main (int argc, char* argv[]){
  GraphReader reader;
  Graph g;
  reader.read(&g, argv[1], false);
  DynProg dyn(&g);
  std::vector<int> vec;
  for (int i = 2; i < argc; i++){
    vec.push_back(std::stoi(argv[i]));
  }
  cout << "starting search on " << vec.size() << " elements" << endl;
  //map<int, map<int, Result>> distances = dyn.calcDistances(vec);
  //dyn.heldKarp(distances);
  int nodeId = g.findNode(48.9053, 9.1350);
  std::cout << nodeId << endl;
}
