#include "dynprog.h"
#include "search.h"
#include <iostream>
#include <limits>
#include <bitset>
#include "treeNode.h"
#include <deque>
#include <vector>
#include <algorithm>

inline int binomial(int n, int k){
    if(k> n -k ){
        k = n-k;
    }
    int b = 1;
    int i;
    int m; 
    for (i = 1,m = n; i <= k; i++, m--){
        b = b*m/i;
    }
    return b;
}

DynProg::DynProg(Graph* graph){
    this->g = graph;
}

 map<int, map<int, Result>> DynProg::calcDistances(vector<int> nodes){
    map<int, map<int, Result>> distances;
    int i = 0;
    vector<int> notFound;
    for (auto it = nodes.begin(); it != nodes.end(); ++it){
        // TODO clean up search and use multiple times
        Search s(this->g);
        vector<int> targets;
        for (auto it_targets = nodes.begin(); it_targets != nodes.end(); ++it_targets){
            if (it != it_targets){
                int target = *it_targets;
                targets.push_back(target);
            }
        }
        if (find(notFound.begin(), notFound.end(), it) != notFound.end())
            continue;
        map<int, Result> m = s.oneToMany(*it, targets);
        for (int node: nodes){
            if(node != *it && m.find(node) == m.end() && find(notFound.begin(), notFound.end(), node) == notFound.end()){
                cout << "Not found: " << node << endl;
                notFound.push_back(node);
            }
        }
        distances.insert(pair<int, map<int, Result>>(*it, m));
        ++i;
    }
    //erasing the nodes which could not be found

    for (auto notFoundNode: notFound){
        auto it = distances.find(notFoundNode);
        if ( it != distances.end())
            distances.erase(distances.find(notFoundNode));
        for (auto mapPair: distances){
            auto notFoundIterator = mapPair.second.find(notFoundNode);
            if (notFoundIterator != mapPair.second.end())
                distances[mapPair.first].erase(notFoundIterator);
        }
    }
    return distances;
}


/**
 * Held-Karp algorithm for solving asymmetric TSP. This implementation
 * is using bitmasking to indicate subsets
 **/



pair<int, vector<Node>> DynProg::heldKarp(map<int, map<int, Result>>  distances){
    bool verbose = false;
    vector<Node> path;
    int n = distances.size();
    int table[n][n];
    map<int, int> indexToNodeId;
    // Generate actual distance table and remember which index belongs to which vertex
    int i = 0;
    for (auto it = distances.begin(); it != distances.end(); ++it){
        indexToNodeId.insert(pair<int, int>(i, it->first));
        i++;
    }
    printDistances(distances);
    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            if (i == j)
                table[i][j] = 0;
            else{
                int source = indexToNodeId[i];
                int target = indexToNodeId[j];
                table[i][j] = distances[source][target].distance;
            }
        }
    }

    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            cout << table[i][j] << " ";
        }
        cout << endl;
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

    for (int i = 1; i < n; i++){
        cout << bitset<8>(mask) << endl;
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


    // search for the best path in the table
    // get the n-1 nodes which build the path starting from source node [0][0]
     

    // search for the best path in the table
    // get the n-1 nodes which build the path starting from source node [0][0]
    cout << "Costs: "<< cost <<"Path: ";
    for (auto nodeId: intermediatePath) cout << "->" << nodeId;
    cout << endl;
    cout << "size of intermediate path: " << intermediatePath.size() << endl;
    int tspcosts = 0;
    reverse(intermediatePath.begin(), intermediatePath.end());
    int source = indexToNodeId[0];
    int target = -1;
    for (auto it: intermediatePath){
        target = indexToNodeId[it];
        for (auto node: distances[source][target].path){
            path.push_back(node);
        }
        tspcosts += distances[source][target].distance;
        source = target;
    }

    for (auto node: distances[target][indexToNodeId[0]].path)
        path.push_back(node);
    tspcosts += distances[target][indexToNodeId[0]].distance;
    cout << endl;
    cout << "optimal path:" << tspcosts << endl;
    return make_pair(tspcosts, path);
}




void visit(vector<TreeNode> *tree, vector<int> *visited, int current){
    visited->push_back(current);
    if(visited->size() == tree->size()) return;
    for (auto child: tree->operator[](current).children){
        visit(tree, visited, child);
    }
}

int getCosts (map<int, map<int, Result>> distances, vector<int> visited, vector<TreeNode> tree, map<int, int> indexToNodeId){
    int source = indexToNodeId[visited[0]];
    int currentCosts = 0;
    int target = -1;
    // get costs of calculated path
    for (int i = 1; i < visited.size(); i++){
        target = indexToNodeId[visited[i]];
        currentCosts += distances[source][target].distance;
        source = target;
    }
    currentCosts += distances[target][indexToNodeId[0]].distance;
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


pair<int, vector<Node>> DynProg::apx(map<int, map<int, Result>>  distances){
    cout << "Starting calculation of APX" << endl;
    vector<Node> path;

    int n = distances.size();
    int table[n][n];
    map<int, int> indexToNodeId;
    // Generate actual distance table and remember which index belongs to which vertex
    int i = 0;
    for (auto it = distances.begin(); it != distances.end(); ++it){
        indexToNodeId.insert(pair<int, int>(i, it->first));
        i++;
    }
    printDistances(distances);
    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            if (i == j)
                table[i][j] = 0;
            else{
                int source = indexToNodeId[i];
                int target = indexToNodeId[j];
                table[i][j] = distances[source][target].distance;
            }
        }
    }

    for (int i = 0; i < n; i++){
        for (int j = 0; j < n; j++){
            cout << table[i][j] << " ";
        }
        cout << endl;
    }

    vector<TreeNode> tree(n);
    vector<int> added;
    added.push_back(0);
    int treeCosts = 0;

    while(added.size() < n){
        int parent = -1;
        int child = -1;
        int minimum = numeric_limits<int>::max();
        for (int node: added){
            for (int i = 0; i < n; i++){
                if (find(added.begin(), added.end(), i) != added.end())
                    continue;
                int value = table[node][i];
                if (value < minimum && value != 0){
                    minimum = value;
                    parent = node;
                    child = i;
                }
            }
        }
        treeCosts += minimum;
        added.push_back(child);
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


    cout << " treeCosts: "<< treeCosts <<  "before testing: Path: 0";
    for (auto nodeId: visited) cout << "->" << nodeId;
    cout << endl;
    // get costs of calculated path
    // check for all node pairs of swapping them 
    int currentCosts = getCosts(distances, visited, tree, indexToNodeId);
     vector<int> tmpVisited(visited);
    for (int i = 1; i < visited.size(); i++){
        for (int j = 1; j < visited.size(); j++){
            if(i == j) continue;
            int swap_i = visited[i];
            tmpVisited[i] = visited[j];
            int swap_j = visited[j];
            tmpVisited[j] = visited[i];
            int costs = getCosts(distances, tmpVisited, tree, indexToNodeId);
            if (costs < currentCosts){
                currentCosts = costs;
            }else {
                tmpVisited[i] = swap_i;
                tmpVisited[j] = swap_j;
            }
        }
    } 
    visited = tmpVisited;
    int apxCosts = 0;

    auto it_0 = visited.begin();
    auto it_1 = visited.begin() + 1;
    int source; 
    int target;
    while (it_1 != visited.end()){
        source = indexToNodeId[*it_0];
        target = indexToNodeId[*it_1];
        for (Node node: distances[source][target].path){
            path.push_back(node);
        }
        apxCosts += distances[source][target].distance;
        it_0++;
        it_1++;
    }
    for (Node node: distances[target][indexToNodeId[0]].path){
        path.push_back(node);
    }
    apxCosts += distances[target][indexToNodeId[0]].distance;
    return make_pair(apxCosts, path);
}