
#ifndef DYNPROG_H
#define DYNPROG_H
#include <cstdint>

#include <vector>
#include "graph.h"


using namespace std;
class DynProg
{
 public:
 Graph* g;
 DynProg(Graph* g);
 vector<vector<int>> createDistanceTable(vector<int> nodes);
};

#endif
