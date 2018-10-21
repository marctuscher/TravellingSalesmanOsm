#include "dynprog.h"
#include "search.h"
#include <iostream>
#include <limits>
#include <bitset>
#include "treeNode.h"
#include <deque>
#include <vector>
#include <algorithm>

using namespace std;

DynProg::DynProg(Graph* graph){
    this->g = graph;
}

 void DynProg::calcDistances(vector<int>* nodes, map<int, map<int, Result>>* distances){
    vector<int> notFound;
    for (int i = 0; i < nodes->size(); i++){
        // TODO clean up search and use multiple times
        Search s(this->g);
        vector<int> targets;
        for (int j = 0; j < nodes->size(); j++ ){
            if (i != j){
                int target = nodes->operator[](j);
                targets.push_back(target);
            }
        }
        if (find(notFound.begin(), notFound.end(), nodes->operator[](i)) != notFound.end())
            continue;
        map<int, Result> m;
        s.oneToMany(nodes->operator[](i), &targets, &m);
        for (int node: *nodes){
            if(node != nodes->operator[](i) && m.find(node) == m.end() && find(notFound.begin(), notFound.end(), node) == notFound.end()){
                cout << "Not found: " << node << endl;
                notFound.push_back(node);
            }
        }
        distances->insert(pair<int, map<int, Result>>(nodes->operator[](i), m));
    }
    //erasing the nodes which could not be found

    for (auto notFoundNode: notFound){
        auto it = distances->find(notFoundNode);
        if ( it != distances->end())
            distances->erase(distances->find(notFoundNode));
        for (auto mapPair: *distances){
            auto notFoundIterator = mapPair.second.find(notFoundNode);
            if (notFoundIterator != mapPair.second.end())
                distances->operator[](mapPair.first).erase(notFoundIterator);
        }
    }
}


/**
 * Held-Karp algorithm for solving asymmetric TSP. This implementation
 * is using bitmasking to indicate subsets
 **/



int DynProg::heldKarp(map<int, map<int, Result>>*  distances, vector<Node>* path){
    bool verbose = false;
    int n = distances->size();
    int table[n][n];
    map<int, int> indexToNodeId;
    // Generate actual distance table and remember which index belongs to which vertex
    int i = 0;
    for (auto it = distances->begin(); it != distances->end(); ++it){
        indexToNodeId.insert(pair<int, int>(i, it->first));
        i++;
    }

    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            if (i == j)
                table[i][j] = 0;
            else{
                int source = indexToNodeId[i];
                int target = indexToNodeId[j];
                table[i][j] = distances->operator[](source)[target].distance;
            }
        }
    }




    vector<vector<int>> costs;
    for (int i = 0; i < n; ++i){
        costs.push_back(vector<int>(1<<n, numeric_limits<int>::max()));
    }
    for (int i = 0; i < n; ++i){
        // Fill in the initial distances
        costs[i][1<<i]=table[0][i];
    }

    for (int s = 2; s < n; s++){
        for (int mask = 0; mask < (1 << n); mask++){
            if (bitset<32>(mask).count() != s){
                continue;
            }
            if(verbose) cout << "Subset: " << s << " Mask: " << bitset<8>(mask) << endl;
            for (int k = 0; k < n; k++){
                if ((mask & (1 << k)) == 0){
                    continue;
                }
                int minimum = numeric_limits<int>::max();
                for (int m = 0; m < n; m++){
                    if (m == k || (mask & (1 << m ))== 0){
                        continue;
                    }
                    int value = costs[m][mask & ~(1 << k)] + table[m][k];
                       if (value < minimum){
                        minimum = value;
                    }

                }
               if(verbose) cout << " k: " << k << " mask: " << bitset<8>(mask) << " value: " << minimum << endl;
                costs[k][mask] = minimum;
            }
        }
    }

    int opt = numeric_limits<int>::max();
    int cost = 0;
    int minimumNode = -1; 

    vector<int> intermediatePath;
    int mask = 0;
    int currentNode = 0;
    for (int s = 1; s < n; s++){
        mask += (1 << s);
    }
    // search for the best path in the table
    // get the n-1 nodes which build the path starting from source node [0][0]

    for (int i = 1; i < n; i++){
        for (int k = 1; k < n; k++){
            if ((mask &( 1 << k )) == 0)
                continue;
            int value = costs[k][mask] + table[k][currentNode];
            if (value < opt){
                opt = value;
                minimumNode = k;
                if (k == 1)
                    cost = value;
            }
        }
        intermediatePath.push_back(minimumNode);
        currentNode = minimumNode;
        mask = (mask & ~( 1 << minimumNode));
        opt = numeric_limits<int>::max();
    }


    cout << "Costs: "<< cost << endl;
    cout << "size of intermediate path: " << intermediatePath.size() << endl;
    int tspcosts = 0;
    reverse(intermediatePath.begin(), intermediatePath.end());
    int source = indexToNodeId[0];
    int target = -1;
    for (auto it: intermediatePath){
        target = indexToNodeId[it];
        for (auto node: distances->operator[](source)[target].path){
            path->push_back(node);
        }
        tspcosts += distances->operator[](source)[target].distance;
        source = target;
    }

    for (auto node: distances->operator[](target)[indexToNodeId[0]].path)
        path->push_back(node);
    tspcosts += distances->operator[](target)[indexToNodeId[0]].distance;
    cout << "optimal path:" << tspcosts << endl;
    return tspcosts;
}


int getCosts (vector<int>* visited, int *table, int n){
    int source = 0;
    int currentCosts = 0;
    int target = -1;
    // get costs of calculated path
    for (int i = 1; i < n; i++){
        target = visited->operator[](i);
        currentCosts += *((table + source * n) + target);
        source = target;
    }
    currentCosts += *((table + source * n));
    return currentCosts;
}


void DynProg::printDistances(map<int, map<int, Result>> distances){
    for (auto source: distances){
        cout << "Source: " << source.first << " targets: ";
        for (auto target: source.second){
            cout << "<" << target.first << " : " << target.second.distance << "> ";
        }
        cout << endl;
    }
}




bool swapNodes(vector<int> *visited, int* table, int* currentCosts, int n){
    for (int i = 1; i< n; i++){
            for (int j = i + 1; j < n; j++){
                if(i == j) 
                    continue;
                int source_i = i-1;
                int source_j = j-1;
                int target_i = i < (n-1) ? i + 1 : 0;
                int target_j = j < (n-1) ? j + 1 : 0;
                int localCostsBefore = *((table + visited->operator[](source_i) * n )+ visited->operator[](i)) + *((table + visited->operator[](source_j) * n) + visited->operator[](j))
                    + *((table + visited->operator[](i) * n )+ visited->operator[](target_i)) + *((table + visited->operator[](j) * n) + visited->operator[](target_j));
                int swap_i = visited->operator[](i);
                int swap_j = visited->operator[](j);
                visited->operator[](i) = swap_j;
                visited->operator[](j) = swap_i;
                int localCostsAfter = *((table + visited->operator[](source_i) * n )+ visited->operator[](i)) + *((table + visited->operator[](source_j) * n) + visited->operator[](j))
                    + *((table + visited->operator[](i) * n )+ visited->operator[](target_i)) + *((table + visited->operator[](j) * n) + visited->operator[](target_j));
                if (localCostsAfter < localCostsBefore){
                    *currentCosts -= (localCostsBefore - localCostsAfter);
                    return true;
                }else{
                    visited->operator[](i) = swap_i;
                    visited->operator[](j) = swap_j;
                }

            }
        } 
        return false;
}


pair<int, int> DynProg::apx(map<int, map<int, Result>>  *distances, vector<Node>* path){
    cout << "Starting calculation of APX" << endl;

    int n = distances->size();
    int table[n][n];
    map<int, int> indexToNodeId;
    // Generate actual distance table and remember which index belongs to which vertex
    int i = 0;
    for (auto it = distances->begin(); it != distances->end(); ++it){
        indexToNodeId.insert(pair<int, int>(i, it->first));
        i++;
    }
    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            if (i == j)
                table[i][j] = 0;
            else{
                int source = indexToNodeId[i];
                int target = indexToNodeId[j];
                table[i][j] = distances->operator[](source)[target].distance;
            }
        }
    }

    vector<TreeNode> tree(n);
    vector<int> added;
    vector<bool> alreadyAdded(n, false);
    alreadyAdded[0] = true;
    added.push_back(0);
    int treeCosts = 0;

    while(added.size() < n){
        int parent = -1;
        int child = -1;
        int minimum = numeric_limits<int>::max();
        for (int node: added){
            for (int i = 0; i < n; i++){
                if (alreadyAdded[i] || node == i)
                    continue;
                int value = table[node][i];
                if (value < minimum){
                    minimum = value;
                    parent = node;
                    child = i;
                }
            }
        }
        treeCosts += minimum;
        added.push_back(child);
        alreadyAdded[child] = true;
        tree[parent].children.push_back(child);
    }

    vector<int> visited;
    deque<int> queue;

    queue.push_back(0);
    while (!queue.empty()){
        int current = queue.front();
        visited.push_back(current);
        for (auto child: tree[current].children){
            queue.push_back(child);
        }
        queue.pop_front();
    }


    // get costs of calculated path
    // check for all node pairs of swapping them 
    int currentCosts = getCosts(&visited, &table[0][0], n);
    int costsBefore = currentCosts;
    cout << "costs before swap: " << currentCosts << endl;
    bool changed = false;
    do {
        changed = swapNodes(&visited, &table[0][0], &currentCosts, n);
    } while (changed);

    cout << " Costs after swap: "<< currentCosts << endl;
    int source = indexToNodeId[visited[0]];
    int target = -1;
    // get costs of calculated path
    for (int i = 1; i < visited.size(); i++){
        target = indexToNodeId[visited[i]];
        for (Node node: distances->operator[](source)[target].path){
            path->push_back(node);
        }
        source = target;
    }
        for (Node node: distances->operator[](target)[indexToNodeId[0]].path){
            path->push_back(node);
        }
    return make_pair(currentCosts, costsBefore);
}