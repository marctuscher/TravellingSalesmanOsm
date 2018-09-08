#include "dynprog.h"
#include "search.h"
#include <map>

DynProg::DynProg(Graph* graph){
    this->g = graph;
}

vector<vector<int>> DynProg::createDistanceTable(vector<int> nodes){
    vector<vector<int>> table;
    Search s(this->g);
    int i = 0;
    for (auto it = nodes.begin();it != nodes.end(); ++it){
        vector<int> targets;
        for (auto it_targets = nodes.begin(); it_targets != nodes.end(); ++it_targets){
            if (*it != *it_targets){
                targets.push_back(*it_targets);
            }
        }
        map<int, int> m = s.oneToMany(*it, targets);
        ++i;
    }
    return table;
}