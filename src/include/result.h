#ifndef RESULT_H
#define RESULT_H

#include "node.h"
#include "edge.h"
#include <vector>

class Result
{
 public:
  int distance;
  std::vector<Node> path;
};

#endif// RESULT_H
