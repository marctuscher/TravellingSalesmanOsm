#include "node.h"
#include <cstdint>

Node::Node(long _nodeid, float _latitude, float _longitude)
{
  id = _nodeid;
  lati = _latitude;
  loni = _longitude;
}
Node::Node(long _nodeid){
  id = _nodeid;
}
Node:: Node(){}
