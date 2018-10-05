#include "search.h"
#include <cstdint>
#include <limits>
#include <algorithm>

Search::Search(Graph* graph){
  this->g = graph;
  this->visited = std::vector<bool>(graph->nodes.size(), false);
  this->parents = std::vector<int>(graph->nodes.size(), -1);
  this->distances = std::vector<int>(graph->nodes.size(), std::numeric_limits<int>::max());
}

void Search::reset(){
  // TODO clean up!!
  u_int stop = std::max(this->touch_parents.size(), this->touch_visited.size());

  this-> pq = std::priority_queue<pair<int, int>, std::vector<pair<int, int>>, sort_operator>();
  for (u_int i = 0; i< stop; i++){
    if (this->touch_visited.size() < i){
      this->visited[this->touch_visited[i]] = false;
    }
    if (this->touch_parents.size() < i){
      this->parents[this->touch_parents[i]] = -1;
      this->distances[this->touch_parents[i]] = std::numeric_limits<int>::max();
    }
  }
}

void Search::expand(int source, int costs){
  this->visited[source] = true;
  this->touch_visited.push_back(source);
  for(int i = this->g->offset[source]; i < this->g->offset[source+1] ; i++){
    pq.push(make_pair((this->g->edges[i].cost + costs), this->g->edges[i].trg));
    if(this->distances[this->g->edges[i].trg]> this->g->edges[i].cost + costs){
      this->parents[this->g->edges[i].trg] = i;
      this->touch_parents.push_back(this->g->edges[i].trg);
      this->distances[this->g->edges[i].trg] = this->g->edges[i].cost + costs;
    }
  }
}

Result Search::oneToOne(int source, int target){
  Result result;
  pair<int,int> current;
  this->expand(source, 0);
  while(!this->pq.empty()){
    current = pq.top();
    if (get<1>(current) == target){
      result.distance = get<0>(current);
      std::cout << result.distance << std::endl;
      int currNode = target;
      result.path.insert(result.path.begin(), this->g->nodes[currNode]);
      while (currNode != source){
        currNode = this->g->edges[this->parents[currNode]].src;
        result.path.insert(result.path.begin(), this->g->nodes[currNode]);
      }
      break;
    }
    pq.pop();
    if(!this->visited[get<1>(current)])
      this->expand(get<1>(current), get<0>(current));
  }
  return result;
}

map<int, Result> Search::oneToMany(int source, vector<int> targets){
  map<int, Result> output_map;
  pair<int,int> current;

  this->expand(source, 0);
  while(!this->pq.empty()){
    current = pq.top();
    auto it = find(targets.begin(), targets.end(), current.second); 
      if (it != targets.end()){
        cout << "found " << current.second << endl;
        Result res;
        res.distance = current.first;
        int target = current.second;
        res.path = getPath(source, target);
        output_map.insert(pair<int, Result>(current.second, res));
        targets.erase(it);
        if(targets.size() == 0){
          return output_map;
        }
      }
    pq.pop();
    if(!this->visited[get<1>(current)])
      this->expand(get<1>(current), get<0>(current));
  }
  return output_map;
}

vector<Node> Search::getPath(int source, int currNode){
  vector<Node> path;
      path.insert(path.begin(), this->g->nodes[currNode]);
      while (currNode != source){
        currNode = this->g->edges[this->parents[currNode]].src;
        path.insert(path.begin(), this->g->nodes[currNode]);
      }
    return path;
}


