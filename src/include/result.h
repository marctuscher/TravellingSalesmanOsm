#ifndef RESULT_H
#define RESULT_H

#include "node.h"
#include "edge.h"
#include <vector>

using namespace std;

class Result
{
 public:
  int distance = -1;
  std::vector<Node> path;
  
};

#endif// RESULT_H
