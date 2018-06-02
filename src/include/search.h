
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
#include <utility>
using namespace std;

struct sort_operator
{
  inline bool operator() (const pair<int, int>& t1, const pair<int, int> & t2)
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
  std::priority_queue<pair<int, int>, std::vector<pair<int, int>>, sort_operator> pq;
  int dijkstra(int source, int target);
  void expand(int source, int costs);
};

#endif// SEARCH_H
