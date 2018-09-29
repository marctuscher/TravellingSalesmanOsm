#ifndef EDGE_H
#define EDGE_H

class Edge
{
 public:
  int src;
  int trg;
  int cost;
  int maxSpeed;
  Edge(int _src, int _trg, int _maxSpeed);
  Edge();
};

#endif
