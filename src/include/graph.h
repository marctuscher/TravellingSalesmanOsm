#ifndef GRAPH_H
#define GRAPH_H
#include <cstdint>

#include "node.h"
#include "edge.h"
#include <vector>

class Graph
{
 public:
  int nodecount;
  std::vector<Node> nodes;
  int edgecount;
  std::vector<Edge> edges;
  std::vector<int> offset;
  void generateOffsetOut();

};

#endif// GRAPH_H
