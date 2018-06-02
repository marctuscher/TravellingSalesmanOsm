#include "graph.h"
#include <cstdint>

#include "stdio.h"

struct sort_operatorNodes
{
  inline bool operator() (const Node& node1, const Node& node2)
  {
    return (node1.id < node2.id);
  }
};

void Graph::generateOffsetOut() {
    offset.push_back(0);
    int v = 0;
    for (int i = 0; i < edges.size(); i++) {
        if (edges[i].src != v) {
            while (v < edges[i].src) {
                v++;
                offset.push_back(i);
            }
        }
    }
    for (int k = v + 1; k < nodes.size() + 1; k++) {
        offset.push_back(edges.size());
    }
}

int Graph::getNodeId(int64_t globalId, int low, int high){
  if (high < low){
    return -1;
  }
  auto mid = (low + high) /2;
  if (globalId < nodes[mid].id){
    return getNodeId(globalId, low, mid-1);
  }else if (globalId > nodes[mid].id){
    return getNodeId(globalId, mid+1, high);
  }
  return mid;
}
