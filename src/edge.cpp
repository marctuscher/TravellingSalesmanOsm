#include "edge.h"


Edge::Edge(){
}

Edge::Edge(int _src, int _trg, int _maxSpeed)
{
  src = _src;
  trg = _trg;
  maxSpeed = _maxSpeed;
}
