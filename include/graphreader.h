#include "graph.h"
#include <osmpbf/blobfile.h>
#include <osmpbf/osmfile.h>
#include <osmpbf/primitiveblockinputadaptor.h>
#include <osmpbf/inode.h>
#include <osmpbf/iway.h>
#include <osmpbf/irelation.h>

#ifndef GRAPHREADER_H
#define GRAPHREADER_H

class GraphReader{
public:
  int read(Graph* out, char * inputFileName, bool verbose);
};

#endif // GRAPHREADER_H
