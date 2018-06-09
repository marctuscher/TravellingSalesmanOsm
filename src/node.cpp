#include "node.h"
#include <cstdint>

Node::Node(int64_t _nodeid, float _latitude, float _longitude)
{
  id = _nodeid;
  lati = _latitude;
  loni = _longitude;
}
Node::Node(int64_t _nodeid){
  id = _nodeid;
}
Node:: Node(){}
