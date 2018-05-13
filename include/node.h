
#ifndef NODE_H
#define NODE_H

class Node
{
 public:
  int nodeid;
  float latitude;
  float longitude;
  int distance;
  Node(int _nodeid, float _latitude, float _longitude);
};

#endif
