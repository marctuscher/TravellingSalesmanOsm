#include <iostream>
#include "graphreader.h"
#include "graph.h"
#include <sstream>
#include <string>
#include <cstring>
#include "search.h"
#include <chrono>

int main (int argc, char* argv[]){
  GraphReader reader;
  Graph graph;
  reader.read(&graph, argv[1], true);
  std::cout << graph.nodes.size() << std::endl;
  Search search(&graph);

  int source;
  int target;
  bool correctSource = false;
  bool correctTarget = false;
    bool exit = false;
    while(!exit){
      while(!correctSource){
        std::cout << "Please enter source nodeId: " << std::endl;
        std::cin >> source;
        if (source >= 0 && source < graph.nodes.size()){
          correctSource = true;
        }else{
          std::cout << "Enter a nodeId between 0 and "<< graph.nodes.size() << std::endl;
        }
      }
      while(!correctTarget){
        std::cout << "---------------------" << std::endl;
        std::cout << "Please enter target nodeId: " << std::endl;
        std::cin >> target;
        if (target >= 0 && target < graph.nodes.size()){
          correctTarget = true;
        }else{
          std::cout << "Enter a nodeId between 0 and "<< graph.nodes.size() << std::endl;
        }
      }
      std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
      std::cout << "Distanz: " << search.dijkstra(source, target) << std::endl;
      std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
      auto duration= std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
      std::cout << "time needed for search: " << duration << " microseconds" << std::endl;
      exit = true;
      }
}
