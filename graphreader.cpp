#include "graphreader.h"
#include "graph.h"
#include "node.h"
#include "stdio.h"
#include <iostream>
#include <osmpbf/blobfile.h>
#include <osmpbf/osmfile.h>
#include <osmpbf/primitiveblockinputadaptor.h>
#include <osmpbf/inode.h>
#include <osmpbf/iway.h>
#include <osmpbf/irelation.h>


  int GraphReader::read(Graph* out, char * inputFileName, bool verbose){
    int nodeCount = 0;
    int edgeCount = 0;
    osmpbf::OSMFileIn inFile(inputFileName, verbose);
    osmpbf::PrimitiveBlockInputAdaptor pbi;
    if (!inFile.open())
      return -1;

    while (inFile.parseNextBlock(pbi)) {
      if (pbi.isNull())
        continue;

      if (pbi.waysSize()) {
        std::cout << "found " << pbi.waysSize() << " ways:" << std::endl;
        for (osmpbf::IWayStream way = pbi.getWayStream(); !way.isNull(); way.next())
          {
            std::cout << "[Way]" <<
              "\nid = " << way.id() <<
              "\nrefs_size = " << way.refsSize() <<
              "\nrefs:" << std::endl;
            if (way.refsSize()) {
              generics::DeltaFieldConstForwardIterator<int64_t> it;

              for(it = way.refBegin(); it != way.refEnd(); ++it) {
                std::cout << '[' << *it << ']';
              }
              std::cout << std::endl;
            }
            else
              std::cout << " <none>" << std::endl;

            std::cout << "keys, vals:" << std::endl;
            if (way.tagsSize())
              for (int i = 0; i < way.tagsSize(); i++)
                std::cout << '[' << i << "] " << way.key(i) << " = " << way.value(i) << std::endl;
            else
              std::cout << " <none>" << std::endl;
            if (pbi.relationsSize()) {
              std::cout << "found " << pbi.relationsSize() << " relations:" << std::endl;
              for (osmpbf::IRelationStream relationStream = pbi.getRelationStream(); !relationStream.isNull(); relationStream.next())
                {
                  std::cout << "rel" << std::endl;
                }
            }
          }
      }

      if (pbi.nodesSize()) {
        std::cout << "found " << pbi.nodesSize() << " nodes:" << std::endl;
        for (osmpbf::INodeStream node = pbi.getNodeStream(); !node.isNull(); node.next())
          {
            // if (node.tagsSize())
            //   for (int i = 0; i < node.tagsSize(); i++)
            //     std::cout << '[' << i << "] " << node.key(i) << " = " << node.value(i) << std::endl;
            // else
            //   std::cout << " <none>" << std::endl;
            out->nodes.push_back(Node(node.id(), node.lati(), node.loni()));
            nodeCount++;
            std::cout << nodeCount << std::endl;
          }
      }

    }

    inFile.close();
    return 0;
  }

