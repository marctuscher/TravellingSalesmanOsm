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
#include <string>


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

  int GraphReader::read(Graph* out, char * inputFileName, bool verbose, map<string, vector<string>> categories){
    std::chrono::high_resolution_clock::time_point t1 = std::chrono::high_resolution_clock::now();
    std::map<long, int> nodeMap;
    std::map<std::string, int> speedMap;
    int nodesCount = 0;
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
    osmpbf::OrTagFilter category_filter;
    for (auto cat: categories){
      category_filter.addChild(new osmpbf::KeyMultiValueTagFilter(cat.first, cat.second.begin(), cat.second.end()));
    }
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
              if (way.refsSize()) {
                int currentRef = -1;
                int nextRef = -1;
                generics::DeltaFieldConstForwardIterator<int64_t> it_0 = way.refBegin();
                generics::DeltaFieldConstForwardIterator<int64_t> it_1 = way.refBegin()+1;
                std::pair<std::map<long, int>::iterator, bool> inserted;
                while(it_1 != way.refEnd()){
                  inserted = nodeMap.insert({(long)*it_0, nodesCount});
                  if (inserted.second){
                    out->nodes.push_back(Node((long)*it_0));
                    currentRef = nodesCount;
                    nodesCount++;
                  }else{
                    currentRef = inserted.first->second;
                  }
                  inserted = nodeMap.insert({(long)*it_1, nodesCount});
                  if (inserted.second){
                    out->nodes.push_back(Node((long)*it_0));
                    nextRef = nodesCount;
                    nodesCount++;
                  }else{
                    nextRef = inserted.first->second;
                  }
                  if(!oneWayFilter.matches(way)){
                    out->edges.push_back(Edge(nextRef, currentRef, maxSpeed));
                  }
                  out->edges.push_back(Edge(currentRef, nextRef, maxSpeed));
                  ++it_0;
                  ++it_1;
                }
              }
          }
        std::cout << std::flush;

      }
    }
    if (!inFile.open())
      return -1;
    while(inFile.parseNextBlock(pbi)){
      if (pbi.nodesSize()) {
        std::pair<std::map<long, int>::iterator, bool> inserted;
        for (osmpbf::INodeStream node = pbi.getNodeStream(); !node.isNull(); node.next())
          {
            if (nodeMap.count(node.id())){
              double latitude = node.latd();
              double longitude = node.lond();
              inserted = nodeMap.insert({node.id(), 0});
              out->grid[(int)floor(latitude)][(int)floor(longitude)].push_back(inserted.first->second);
              out->nodes[inserted.first->second].tags = map<string, string>();
              for(uint32_t i = 0, s = node.tagsSize();  i < s; ++i) {
                out->nodes[inserted.first->second].tags.insert({node.key(i), node.value(i)});
              }
              out->nodes[inserted.first->second].lati = latitude;
              out->nodes[inserted.first->second].loni = longitude;
            }else if(category_filter.matches(node)){
              double latitude = node.latd();
              double longitude = node.lond();
              out->grid[(int)floor(latitude)][(int)floor(longitude)].push_back(nodesCount);
              Node internNode(node.id());
              internNode.lati = latitude;
              internNode.loni = longitude;
              for(uint32_t i = 0, s = node.tagsSize();  i < s; ++i) {
                internNode.tags.insert({node.key(i), node.value(i)});
              }
              out->nodes.push_back(internNode);
              nodesCount++;
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


