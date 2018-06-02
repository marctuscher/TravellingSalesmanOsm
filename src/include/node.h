#include <cstdint>

#ifndef NODE_H
#define NODE_H

class Node
{
 public:
  int64_t id;
  float lati;
  float loni;
  int dist;
  Node();
  Node(int64_t _nodeid, float _latitude, float _longitude);
};

#endif
