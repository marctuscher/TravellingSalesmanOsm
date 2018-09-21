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

vector<Node> DynProg::heldKarp(map<int, map<int, Result>>  distances){
    vector<Node> path;
    int n = distances.size();
    int table[n][n];
    int i = 0;
    map<int, int> indexToNodeId;
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
        costs[i][1<<i]=table[0][i];
    }

    for (int subset_size = 2; subset_size < n; ++subset_size){
        int v = 0;
        long binom = binomial(n, subset_size);

        for (int i=0; i < binom; i++){
            if (i == 0){
                for (int s = 0; s < subset_size; s++){
                    v += (1 << s);
                }
            }else {
                int t = (v | (v - 1))+1;
                v = t | ((((t & -t)/(v & -v))>> 1)-1);
            }
            for (int k= 0; k <n ; k++){
                if((v & (1 << k )) == 0){
                    continue;
                }

                double minimum = numeric_limits<double>::max();
                for (int m = 0; m < n; m++){
                    if (m == k || (v & (1 << m)) == 0){
                        continue;
                    }
                    double value = costs[m][v & ~(1 << k)] + table[m][k];
                    if (value < minimum){
                        minimum = value;
                    }

                }
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

    for (int i = 1; i <n; i++){
        for (int k = 1; k <n; k++){
            double value = costs[k][v] + table[k][ck];
            if (value < local_opt){
                local_opt = value;
                if (i== 1){
                    opt = local_opt;
                }
                min = k;
            }
        }
        intermediate_path.push_back(min);
        ck = min;
        v = v & ~(1 << (min));
        local_opt = numeric_limits<double>::max();
    }
    cout << "optimal path:" << opt << endl;
    return path;
}

inline pair<int, Result> getMinimum(map<int, Result> oneToManyDistances){

}



vector<Node> DynProg::christofides(map<int, map<int, Result>>  distances){
    vector<Node> path;
    int n = distances.size();
    int table[n][n];
    int i = 0;
    map<int, map<int, Result>> copyOfDistances(distances);
    map<int, Result> added;
    
    Graph c_graph;
    // First generate a minimum spanning tree
    // Get random element from map
    auto it = distances.begin();
    advance(it, rand() % distances.size());
    while(!copyOfDistances.empty()){
//        added.insert(it->second);
 //       copyOfDistances.erase(it);

    }




    





    

    return path;
}