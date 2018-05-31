
#ifndef SEARCH_H
#define SEARCH_H
#include "graph.h"
#include <vector>
#include <cstdint>
#include "stdio.h"
#include "stdio.h"
#include <iostream>
#include <queue>
#include <cstdint>

using namespace std;

struct sort_operator
{
  inline bool operator() (const tuple<int64_t, int>& t1, const tuple<int64_t, int> & t2)
  {
    return (get<0>(t1) < get<0>(t2));
  }
};
class Search
{
 public:
  Graph* g;
  std::vector<bool> visited;
  Search(Graph* g);
  std::priority_queue<tuple<int64_t, int>, std::vector<tuple<int64_t, int>>, sort_operator> pq;
  int64_t dijkstra(int source, int target);
  void expand(int source, int costs);
};

#endif// SEARCH_H
