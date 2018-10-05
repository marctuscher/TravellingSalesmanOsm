#include "dynprog.h"
#include "search.h"
#include <iostream>
#include <limits>
#include <bitset>

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
        if (find(notFound.begin(), notFound.end(), *it) != notFound.end())
            continue;
        map<int, Result> m = s.oneToMany(*it, targets);
        for (auto node: nodes){
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
                costs[k][mask] = minimum;
            }
        }
    }

    int opt = numeric_limits<int>::max();
    int local_opt = numeric_limits<int>::max();
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
            int value = costs[k][mask] + table[k][currentNode];
            if (value < opt){
                opt = value;
                minimumNode = k;
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
    cout << "Path: ";
    for (auto nodeId: intermediatePath) cout << "->" << nodeId;
    cout << endl;
    cout << "size of intermediate path: " << intermediatePath.size() << endl;
    int tspcosts = 0;
    auto it_0 = intermediatePath.begin();
    auto it_1 = intermediatePath.begin() + 1; 
    while (it_1 != intermediatePath.end()){
        int source = indexToNodeId[*it_0];
        int target = indexToNodeId[*it_1];
        for (auto node: distances[source][target].path)
            path.push_back(node);
        tspcosts += distances[source][target].distance;
        ++it_0;
        ++it_1;
    }
    for (auto node: distances[*it_1][indexToNodeId[0]].path)
        path.push_back(node);
    tspcosts += distances[*it_1][indexToNodeId[0]].distance;
    cout << endl;
    cout << "optimal path:" << tspcosts << endl;
    return make_pair(tspcosts, path);
}




void visit(Graph* g, vector<int>* visited, int current){
    visited->push_back(current);
    if(visited->size() == g->nodes.size()) return;
    for (int i = g->offset[current]; i < g->offset[current+1] ; i++){
        visit(g, visited, g->edges[i].trg);
    }
}

int getCosts (map<int, map<int, Result>> distances, vector<int> visited, Graph graph_c){
    int source = graph_c.nodes[visited[0]].id;
    int currentCosts = 0;
    int target = -1;
    // get costs of calculated path
    for (int i = 1; i < visited.size(); i++){
        target = graph_c.nodes[visited[i]].id;
        currentCosts += distances[source][target].distance;
        source = target;
    }
    currentCosts += distances[target][graph_c.nodes[visited[0]].id].distance;
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

    Graph graph_c;
    vector<int> queue;
    vector<int> inserted;
    for (auto distancePair: distances) queue.push_back(distancePair.first);

    cout << "Length of queue: " << queue.size() << endl;
    if (queue.size() == 0){
        cout << "No Node has been found" << endl;
        return make_pair(-1, path);
    }

    
    graph_c.nodes.push_back(Node(queue[0]));
    int nodeCount = 0;
    inserted.push_back(queue[0]);
    queue.erase(queue.begin());
    while(!queue.empty()){
        int minimum = numeric_limits<int>::max();
        int source = -1;
        int insertedIndex = -1;
        for (auto insertedNode : inserted){
            for (int i = 0; i < queue.size(); i++){
                if (distances[insertedNode][queue[i]].distance < minimum){
                    minimum = distances[insertedNode][queue[i]].distance;
                    insertedIndex = i;
                    source = insertedNode;
                }
            }
        }
        cout << "insert node: " << queue[insertedIndex] << endl;
        inserted.push_back(queue[insertedIndex]);
        graph_c.nodes.push_back(Node(queue[insertedIndex]));
        Edge e; 
        e.src = nodeCount;
        nodeCount++;
        e.trg = nodeCount;
        e.cost = minimum;
        graph_c.edges.push_back(e);
        queue.erase(queue.begin() + insertedIndex);
    }
    cout << "generated MST" << endl;
    graph_c.generateOffsetOut();
    vector<int> visited;
    int current = 0;
    visit(&graph_c, &visited, current);
    cout << "before testing: Path: 0";
    for (auto nodeId: visited) cout << "->" << nodeId;
    cout << endl;
    // get costs of calculated path
    int currentCosts = getCosts(distances, visited, graph_c);
    // check for all node pairs of swapping them 
    vector<int> tmpVisited(visited);
    for (int i = 1; i < visited.size(); i++){
        for (int j = 1; i < visited.size(); i++){
            if(i == j) continue;
            int swap_i = visited[i];
            tmpVisited[i] = visited[j];
            int swap_j = visited[j];
            tmpVisited[j] = visited[i];
            int costs = getCosts(distances, tmpVisited, graph_c);
            if (costs < currentCosts){
                currentCosts = costs;
            }else {
                tmpVisited[i] = swap_i;
                tmpVisited[j] = swap_j;
            }
        }
    }
    //visited = tmpVisited;
    int source = graph_c.nodes[visited[0]].id;
    int costs = 0;
    int target = -1;
    cout << "Path: 0";
    for (auto nodeId: visited) cout << "->" << nodeId;
    cout << endl;

    for (int i = 1; i < visited.size(); i++){
        target = graph_c.nodes[visited[i]].id;
        for (auto node: distances[source][target].path){
            path.push_back(node);
        }
        costs += distances[source][target].distance;
        source = target;
    }
    costs += distances[target][graph_c.nodes[visited[0]].id].distance;
    for (auto node: distances[target][graph_c.nodes[visited[0]].id].path) path.push_back(node);
    return make_pair(costs, path);
}