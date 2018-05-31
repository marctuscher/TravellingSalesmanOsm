#include "search.h"
#include <cstdint>
Search::Search(Graph* graph){
  this->g = graph;
  this->visited = std::vector<bool>(graph->nodes.size(), false);
}

void Search::expand(int source, int costs){
  this->visited[source] = true;
  for(int i = this->g->offset[source]; i < this->g->offset[source+1] ; i++){
    pq.push(make_tuple((this->g->edges[i].cost + costs), this->g->edges[i].trg));
  }
}

int64_t Search::dijkstra(int source, int target){
  tuple<int64_t,int> current;
  this->expand(source, 0);
  while(!this->pq.empty()){
    current = pq.top();
    if (get<1>(current) == target){
      return get<0>(current);
    }
    pq.pop();
    if(!this->visited[get<1>(current)])
      this->expand(get<1>(current), get<0>(current));
  }
}
