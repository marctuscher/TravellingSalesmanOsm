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
  // lat lon grid for storing nodes (this only works for nodes in Europe)
  vector<int> grid[60][40];
  void generateOffsetOutAndCosts();
  int getNodeId(int64_t globalId, int, int);
  int findNode(double lat, double lon);
  int findNodeByCategory(string group, string category, double currentLat, double currentLon);
};

#endif// GRAPH_H
