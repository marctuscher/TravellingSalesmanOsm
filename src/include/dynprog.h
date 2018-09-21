
#ifndef DYNPROG_H
#define DYNPROG_H
#include <cstdint>
#include <vector>
#include "graph.h"
#include "result.h"
#include <map>

using namespace std;
class DynProg
{
 public:
 Graph* g;
 DynProg(Graph* g);
 map<int, map<int, Result>> calcDistances(vector<int> nodes);
 vector<Node> heldKarp(map<int, map<int, Result>> distances); 
 vector<Node> christofides(map<int, map<int, Result>> distances);
};

#endif
