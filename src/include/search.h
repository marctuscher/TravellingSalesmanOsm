
#ifndef SEARCH_H
#define SEARCH_H
#include "graph.h"
#include "result.h"
#include <vector>
#include <cstdint>
#include "stdio.h"
#include "stdio.h"
#include <iostream>
#include <queue>
#include <cstdint>
#include <utility>
#include <map>
using namespace std;

struct sort_operator
{
  inline bool operator() (const pair<int, int>& t1, const pair<int, int> & t2)
  {
    return (get<0>(t1) > get<0>(t2));
  }
};
class Search
{
 public:
  Graph* g;
  Search();
  std::vector<bool> visited;
  std::vector<int> parents;
  std::vector<int> distances;
  std::vector<int> touch_visited;
  std::vector<int> touch_parents;
  Search(Graph* g);
  std::priority_queue<pair<int, int>, std::vector<pair<int, int>>, sort_operator> pq;
  void oneToOne(int source, int target, Result* result);
  void oneToMany(int source, std::vector<int>* targets , map<int, Result>* resultMap);
  void getPath(int source,int currNode, vector<Node>* path);
  void expand(int source, int costs);
  void reset();
};

#endif// SEARCH_H
