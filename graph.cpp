#include "graph.h"
#include <cstdint>

#include "stdio.h"

int Graph::findNodeById(int64_t id){
  for(size_t i = 0; i < this->nodes.size(); i++){
    if (nodes[i].id == id){
      return i;
    }
  }
  return -1;
}
