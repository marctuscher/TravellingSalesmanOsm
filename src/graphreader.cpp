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
#include <osmpbf/parsehelpers.h>
#include <osmpbf/filter.h>
#include <math.h>
#include <iostream>
#include <chrono>
#include <map>
#include <algorithm>


//haversine functionality from RosettaCode

inline bool isNumber(const std::string& s)
{
  return !s.empty() && std::find_if(s.begin(), 
                                    s.end(), [](char c) { return !std::isdigit(c); }) == s.end();
}
inline bool checkSpeedStr(std::string maxSpeedStr){
  return (maxSpeedStr != "none" && maxSpeedStr != "signal" && maxSpeedStr != "walk" && maxSpeedStr != "DE:motorway");
}
struct sort_operator
{
  inline bool operator() (const Edge& edge1, const Edge& edge2)
  {
    return (edge1.src < edge2.src);
  }
};
struct sort_operatorNodes
{
  inline bool operator() (const Node& node1, const Node& node2)
  {
    return (node1.id < node2.id);
  }
};

  int GraphReader::read(Graph* out, char * inputFileName, bool verbose){
    std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
    std::map<int64_t, int> nodeMap;
    std::map<std::string, int> speedMap;
    int nodesCount = 0;
    generics::DeltaFieldConstForwardIterator<int64_t> it;
    speedMap.insert(std::pair<std::string, int>("motorway",  130));
    speedMap.insert(std::pair<std::string, int>("motorway_link",  70));
    speedMap.insert(std::pair<std::string, int>("primary" ,  100));
    speedMap.insert(std::pair<std::string, int>("primary_link" ,  70));
    speedMap.insert(std::pair<std::string, int>("secondary",  80));
    speedMap.insert(std::pair<std::string, int>("secondary_link",  70));
    speedMap.insert(std::pair<std::string, int>("tertiary", 70));
    speedMap.insert(std::pair<std::string, int>("tertiary_link", 70));
    speedMap.insert(std::pair<std::string, int>("trunk", 130));
    speedMap.insert(std::pair<std::string, int>("trunk_link", 80));
    speedMap.insert(std::pair<std::string, int>("unclassified", 50));
    speedMap.insert(std::pair<std::string, int>("residential", 45));
    speedMap.insert(std::pair<std::string, int>("living_street", 5));
    speedMap.insert(std::pair<std::string, int>("road", 50));
    speedMap.insert(std::pair<std::string, int>("service", 30));
    speedMap.insert(std::pair<std::string, int>("turning_circle", 50));
    osmpbf::OSMFileIn inFile(inputFileName, verbose);
    osmpbf::PrimitiveBlockInputAdaptor pbi;
    osmpbf::KeyMultiValueTagFilter motorWayFilter("highway", {"motorway", "motorway_link", "primary", "primary_link", "secondary",
          "secondary_link", "tertiary", "tertiary_link", "trunk", "trunk_link", "unclassified", "residential", "living_street", "road", "service", "turning_circle"});
    osmpbf::KeyMultiValueTagFilter oneWayFilter("oneway", {"yes"});
    osmpbf::KeyMultiValueTagFilter maxSpeedFilter("maxspeed", {"none", "signals"});
    if (!inFile.open())
      return -1;

    while (inFile.parseNextBlock(pbi)) {
      if (pbi.isNull())
        continue;
      if(!motorWayFilter.rebuildCache())
        ;

      if (pbi.waysSize()) {
        for (osmpbf::IWayStream way = pbi.getWayStream(); !way.isNull(); way.next())
          if(motorWayFilter.matches(way)){
              std::string maxSpeedStr = "";
              std::string highway_t = "";
              int maxSpeed = 0;
              if (way.tagsSize())
                {
                  for (int i = 0; i < way.tagsSize(); i++)
                    {
                      if (verbose)std::cout << '[' << i << "] " << way.key(i) << " = " << way.value(i) << std::endl;
                      if(way.key(i) == "highway"){
                        highway_t = way.value(i);
                      }
                      if (way.key(i) == "maxspeed"){
                        maxSpeedStr = way.value(i);
                      }

                    }
                  if(!isNumber(maxSpeedStr)){
                    maxSpeed = speedMap[ highway_t ];
                  }else{
                    maxSpeed = std::stoi(maxSpeedStr);
                  }
                }
              else
                std::cout << " not found maxSpeed" << std::endl;
              if (verbose) std::cout << "[Way]" <<
                "\nid = " << way.id() <<
                "\nrefs_size = " << way.refsSize() <<
                "\nrefs:" << std::endl;
              if (way.refsSize()) {
                int refCount= 0;
                int currentRef = -1;
                int prevRef = -1;
                int nextRef = -1;
                for(it = way.refBegin(); it != way.refEnd(); ++it) {

                  if(refCount == 0)
                    {
                      if (nodeMap.find(*it)==nodeMap.end()){
                        nodeMap.insert(std::pair<long, int>(*it, nodesCount));
                        out->nodes.push_back(Node(*it));
                        currentRef = nodesCount;
                        nodesCount++;
                      }else{
                        currentRef = nodeMap[*it];
                      }
                  }
                  else
                    {
                      if (!oneWayFilter.matches(way))
                      {
                      out->edges.push_back(Edge(currentRef, prevRef, maxSpeed));
                    }
                  }
                  if(refCount < way.refsSize()-1)
                    {
                      if (nodeMap.find(*(it+1))==nodeMap.end()){
                        nodeMap.insert(std::pair<long, int>( *(it+1), nodesCount ));
                        out->nodes.push_back(Node(*(it+1)));
                        nextRef = nodesCount;
                        nodesCount++;
                      }else{
                        nextRef = nodeMap[*(it+1)];
                      }
                    out->edges.push_back(Edge(currentRef, nextRef, maxSpeed));
                  }
                  prevRef = currentRef;
                  currentRef = nextRef;
                  refCount++;
                }

                if(verbose) std::cout << "Edgecount: " << out->edges.size() << std::endl;
              }
              else
                if (verbose) std::cout << " <none>" << std::endl;
          }
        std::cout << std::flush;
      }
    }
    if (!inFile.open())
      return -1;
    while(inFile.parseNextBlock(pbi)){
      if (pbi.nodesSize()) {
        if(verbose) std::cout << "found " << pbi.nodesSize() << " nodes:" << std::endl;
        for (osmpbf::INodeStream node = pbi.getNodeStream(); !node.isNull(); node.next())
          {
            if (nodeMap.find(node.id())==nodeMap.end()){
              int index = nodeMap[node.id()];
              out->nodes[index].lati = node.latd();
              out->nodes[index].loni = node.lond();
            }else{
              ;
            }
          }
      }
    }
    std::cout << "finished importing " << std::endl;
    std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
    auto durationEdge = std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
    std::cout << "time needed for graph import: " << durationEdge << " microseconds" << std::endl;
    inFile.close();
    std::sort(out->edges.begin(), out->edges.end(), sort_operator());
    out->generateOffsetOutAndCosts();
    return 0;
  }


