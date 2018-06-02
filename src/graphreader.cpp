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
#include <sparsepp/spp.h>
using spp::sparse_hash_map;


//haversine functionality from RosettaCode
const static double EarthRadiusKm = 6372.8;
inline double DegreeToRadian(double angle)
{
	return M_PI * angle / 180.0;
}
inline double haversine(double lat1,double lon1, double lat2, double lon2)
{
  double latRad1 = DegreeToRadian(lat1);
	double latRad2 = DegreeToRadian(lat2);
	double lonRad1 = DegreeToRadian(lon1);
	double lonRad2 = DegreeToRadian(lon2);
	double diffLa = latRad2 - latRad1;
	double doffLo = lonRad2 - lonRad1;
	double computation = asin(sqrt(sin(diffLa / 2) * sin(diffLa / 2) + cos(latRad1) * cos(latRad2) * sin(doffLo / 2) * sin(doffLo / 2)));
	return 2 * EarthRadiusKm * computation;
}
inline int calculateWeight(double lat1, double lon1, double lat2, double lon2, int maxSpeed){
  double distance = haversine(lat1, lon1, lat2, lon2);
  return (int) ((100 * distance * 3600)/maxSpeed);
}

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
    Node currentNode, nextNode, prevNode;
    int currentRef, nextRef, prevRef;
    int refCount;
    std::map<std::string, int> speedMap;
    int nodesCount = 0;
    int cost = 0;
    std::string maxSpeedStr;
    bool oneWay = false;
    std::string highway_t;
    int maxSpeed;
    bool sorted = false;
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
      if (pbi.nodesSize()) {
        if(verbose) std::cout << "found " << pbi.nodesSize() << " nodes:" << std::endl;
        for (osmpbf::INodeStream node = pbi.getNodeStream(); !node.isNull(); node.next())
          {
            out->nodes.push_back(Node(node.id(), node.latd(), node.lond()));
            nodesCount++;
          }
      }
      if(!motorWayFilter.rebuildCache())
        ;

      if (pbi.waysSize()) {
        if (!sorted){
          sorted = true;
          std::sort(out->nodes.begin(), out->nodes.end(), sort_operatorNodes());
        }
        for (osmpbf::IWayStream way = pbi.getWayStream(); !way.isNull(); way.next())
          if(motorWayFilter.matches(way)){
            {
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
            }
              if (verbose) std::cout << "[Way]" <<
                "\nid = " << way.id() <<
                "\nrefs_size = " << way.refsSize() <<
                "\nrefs:" << std::endl;
              if (way.refsSize()) {
                refCount= 0;
                for(it = way.refBegin(); it != way.refEnd(); ++it) {

                  if(it == way.refBegin())
                    {
                      currentRef = out->getNodeId(*it, 0, (int) out->nodes.size());
                    currentNode = out->nodes[currentRef];
                  }
                  else
                    {
                      if (oneWayFilter.matches(way))
                      {
                      prevNode = out->nodes[prevRef];
                      cost = calculateWeight(currentNode.lati, currentNode.loni, prevNode.lati, prevNode.loni, maxSpeed);
                      out->edges.push_back(Edge(currentRef, prevRef, cost));
                    }
                  }
                  if(refCount < way.refsSize()-1)
                    {
                      nextRef = out->getNodeId(*(it + 1), 0, (int) out->nodes.size());
                    nextNode = out->nodes[nextRef];
                    cost = calculateWeight(currentNode.lati, currentNode.loni, nextNode.lati, nextNode.loni, maxSpeed);
                    out->edges.push_back(Edge(currentRef, nextRef, cost));
                  }
                  prevRef = currentRef;
                  currentRef = nextRef;
                  currentNode = nextNode;
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
    std::cout << "finished importing " << std::endl;
    std::chrono::high_resolution_clock::time_point t2 = std::chrono::high_resolution_clock::now();
    auto durationEdge = std::chrono::duration_cast<std::chrono::microseconds>( t2 - t1 ).count();
    std::cout << "time needed for graph import: " << durationEdge << " microseconds" << std::endl;
    inFile.close();
    std::sort(out->edges.begin(), out->edges.end(), sort_operator());
    out->generateOffsetOut();
    return 0;
  }


