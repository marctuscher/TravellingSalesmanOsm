#include "graph.h"
#include <cstdint>
#include <math.h>
#include "stdio.h"
#include <limits>
#include <iostream>

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
struct sort_operatorNodes
{
  inline bool operator() (const Node& node1, const Node& node2)
  {
    return (node1.id < node2.id);
  }
};

void Graph::generateOffsetOutAndCosts() {
    offset.push_back(0);
    int v = 0;
    for (u_int i = 0; i < edges.size(); i++) {
      edges[i].cost = calculateWeight(nodes[edges[i].src].lati ,nodes[edges[i].src].loni,nodes[edges[i].trg].lati,nodes[edges[i].trg].loni, edges[i].maxSpeed);
        if (edges[i].src != v) {
            while (v < edges[i].src) {
                v++;
                offset.push_back(i);
            }
        }
    }
    for (u_int k = v + 1; k < nodes.size() + 1; k++) {
        offset.push_back(edges.size());
    }
}

int Graph::getNodeId(int64_t globalId, int low, int high){
  if (high < low){
    return -1;
  }
  auto mid = (low + high) /2;
  if (globalId < nodes[mid].id){
    return getNodeId(globalId, low, mid-1);
  }else if (globalId > nodes[mid].id){
    return getNodeId(globalId, mid+1, high);
  }
  return mid;
}


int Graph::findNode(double lat, double lon){
  int node = -1;
  double shortest = std::numeric_limits<int>::max();
  for (u_int i = 0; i < this->nodes.size(); i++){
    double current = haversine(lat, lon, this->nodes[i].lati, this->nodes[i].loni);
    if (current < shortest){
      shortest = current;
      node = i;
    }
  }
  return node;
}
