#ifndef GRAPH_H
#define GRAPH_H

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
  std::vector<int> edgeOffset;
};

#endif// GRAPH_H
