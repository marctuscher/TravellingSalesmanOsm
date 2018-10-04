#include "dynprog.h"
#include "search.h"
#include <iostream>
#include <limits>

inline long binomial(int n, int k){
    if(k> n -k ){
        k = n-k;
    }
    long b = 1;
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
    for (auto it = nodes.begin();it != nodes.end(); ++it){
        // TODO clean up search and use multiple times
        Search s(this->g);
        vector<int> targets;
        for (auto it_targets = nodes.begin(); it_targets != nodes.end(); ++it_targets){
            if (it != it_targets){
                int target = *it_targets;
                targets.push_back(target);
            }
        }
        map<int, Result> m = s.oneToMany(*it, targets);
        distances.insert(pair<int, map<int, Result>>(*it, m));
        ++i;
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
    int i = 0;
    map<int, int> indexToNodeId;
    // Generate actual distance table and remember which index belongs to which vertex
    for (auto it = distances.begin(); it != distances.end(); ++it){
        indexToNodeId.insert(pair<int, int>(i, it->first));
        int j = 0;
        for (auto it2= it->second.begin(); it2 != it->second.end(); ++it2){
            if (i == j){
                table[i][j] = 0;
            }else{
                table[i][j] = it2->second.distance;
            }
            ++j;
        }
        ++i;
    }

    cout << table[0][0] << endl;
    cout <<table [0][1] << endl;
    vector<vector<double>> costs;
    for (int i = 0; i < n; ++i){
        costs.push_back(vector<double>(1<<n, numeric_limits<double>::max()));
    }
    for (int i = 0; i < n; ++i){
        // Fill in the initial distances
        costs[i][1<<i]=table[0][i];
    }

    // all subsets with size are the individual distances from one node to all others
    // -> subsets with size 1 have already been calcualated. Starting at size 2
    for (int subset_size = 2; subset_size < n; ++subset_size){
        int v = 0;
        // calculating the number of possible combinations
        long binom = binomial(n, subset_size);
        // generate first permutation for permutation formula to start
        for (int s = 0; s < subset_size; s++){
            v += (1 << s);
        }
        for (int i=1; i < binom; i++){
            // iterate all possible permutations of #subset_size bits
            // https://graphics.stanford.edu/~seander/bithacks.html#NextBitPermutation
            int t = (v | (v - 1))+1;
            v = t | ((((t & -t)/(v & -v))>> 1)-1);
            
            for (int k= 0; k < n ; k++){
                // only look at nodes which are in the subset
                if((v & (1 << k )) == 0){
                    continue;
                }

                double minimum = numeric_limits<double>::max();
                for (int m = 0; m < n; m++){
                    // if m in subset and  m == k: skip
                    // https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
                    if (m == k || (v & (1 << m)) == 0){
                        continue;
                    }
                    // calculate the the value of using this node in this subset
                    // and check if it is smaller than minimum
                    double value = costs[m][v & ~(1 << k)] + table[m][k];
                    if (value < minimum){
                        minimum = value;
                    }

                }
                //insert the costs of this subset
                costs[k][v] = minimum;
            }
        }
    }
    double opt = numeric_limits<double>::max();
    double local_opt = numeric_limits<double>::max();
    int min = -1; 

    int v = 0;
    for (int s = 1; s < n ; s++){
        v += (1 << s);
    }
    int ck = 0;
    vector<int> intermediate_path;

    // search for the best path in the table
    // get the n-1 nodes which build the path starting from source node [0][0]
    for (int i = 1; i <n; i++){
        for (int k = 1; k <n; k++){
            double value = costs[k][v] + table[k][ck];
            if (value < local_opt){
                local_opt = value;
                if (i == 1){
                    opt = local_opt;
                }
                min = k;
            }
        }
        // insert the best
        intermediate_path.push_back(min);
        ck = min;
        v = v & ~(1 << (min));
        local_opt = numeric_limits<double>::max();
    }
    int tspcosts = 0;
    int source = indexToNodeId[0];
    cout << "size of intermediate path: " << intermediate_path.size() << endl;
    reverse(intermediate_path.begin(), intermediate_path.end());
    for (auto it = intermediate_path.begin(); it != intermediate_path.end(); ++it){
        int target = indexToNodeId[*it];
        for (auto node: distances[source][target].path){
            path.push_back(node);
        }
        tspcosts += distances[source][target].distance;
        source = target;
    }
    for (auto node: distances[source][indexToNodeId[0]].path){
        path.push_back(node);
    }
    tspcosts += distances[source][indexToNodeId[0]].distance;
    cout << endl;
    cout << "optimal path:" << opt << endl;
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


pair<int, vector<Node>> DynProg::apx(map<int, map<int, Result>>  distances){
    vector<Node> path;

    Graph graph_c;
    vector<int> queue;
    vector<int> inserted;
    for (auto distancePair: distances) queue.push_back(distancePair.first);
    
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
    visited = tmpVisited;
    int source = graph_c.nodes[visited[0]].id;
    int costs = 0;
    int target = -1;
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