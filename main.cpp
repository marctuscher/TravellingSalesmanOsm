#include <stdio.h>
#include "graphreader.h"
#include "graph.h"

int main (){
  GraphReader reader;
  Graph graph;
  reader.read(&graph);
