
#ifndef DYNPROG_H
#define DYNPROG_H
#include <cstdint>
#include <vector>
#include "graph.h"
#include "result.h"
#include "node.h"
#include <map>

using namespace std;
class DynProg
{
 public:
 Graph* g;
 DynProg(Graph* g);
 void calcDistances(vector<int>* nodes, map<int, map<int, Result>>* distances);
 int heldKarp(map<int, map<int, Result>>* distances, vector<Node>* path); 
 int apx(map<int, map<int, Result>>* distances, vector<Node>* path);
 void printDistances(map<int, map<int, Result>> distances); 
 
};

#endif
