#include <cstdint>
#include <map>
#include <string>

using namespace std;

#ifndef NODE_H
#define NODE_H

class Node
{
 public:
  long id;
  float lati;
  float loni;
  int dist;
  map<string, string> tags;
  Node();
  Node(long _nodeid, float _latitude, float _longitude);
  Node(long _nodeid);
};

#endif
