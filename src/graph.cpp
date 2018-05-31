#include "graph.h"
#include <cstdint>

#include "stdio.h"


void Graph::generateOffsetOut() {
    offset.push_back(0);
    int v = 0;
    for (int i = 0; i < edges.size(); i++) {
        if (edges[i].src != v) {
            while (v < edges[i].src) {
                v++;
                offset.push_back(i);
            }
        }
    }
    for (int k = v + 1; k < nodes.size() + 1; k++) {
        offset.push_back(edges.size());
    }
}
