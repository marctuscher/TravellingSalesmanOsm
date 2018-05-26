
#ifndef SEARCH_H
#define SEARCH_H
#include "graph.h"
#include <vector>
#include <cstdint>
#include "stdio.h"
#include "stdio.h"
#include <iostream>
#include <queue>

using namespace std;

class Search
{
 public:
  Graph* g;
  std::vector<bool> visited;
  Search(Graph* g);
  std::priority_queue<tuple<int, int>> pq;
  int dijkstra(int source, int target);
  void expand(int source, int costs);
};

#endif// SEARCH_H
