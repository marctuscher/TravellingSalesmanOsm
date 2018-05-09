#include "graphreader.h"
#include "graph.h"
#include "stdio.h"
#include <iostream>
#include <osmpbf/blobfile.h>
#include <osmpbf/osmfile.h>
#include <osmpbf/primitiveblockinputadaptor.h>
#include <osmpbf/inode.h>
#include <osmpbf/iway.h>
#include <osmpbf/irelation.h>


  int GraphReader::read(Graph* out, char * inputFileName, bool verbose){

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
          }
      }

      if (pbi.nodesSize()) {
        std::cout << "found " << pbi.nodesSize() << " nodes:" << std::endl;
        for (osmpbf::INodeStream node = pbi.getNodeStream(); !node.isNull(); node.next())
          {
            std::cout << "[Node]" <<
              "\nid = " << node.id() <<
              "\nlat = " << node.lati() <<
              "\nlon = " << node.loni() <<
              "\ntags ([#] <key> = <value>):" << std::endl;
            if (node.tagsSize())
              for (int i = 0; i < node.tagsSize(); i++)
                std::cout << '[' << i << "] " << node.key(i) << " = " << node.value(i) << std::endl;
            else
              std::cout << " <none>" << std::endl;
          }
      }

    }

    inFile.close();
    return 0;
  }

