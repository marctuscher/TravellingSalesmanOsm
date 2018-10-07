# TravellingSalesmanOsm

OpenStreetMap protobuf files as found on http://download.geofabrik.de/europe.html are read into an efficient internal
graph representation. Solving instances of the Travelling Salesman Problem is done using the [Held-Karp algorithmn](https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm)
with bitmasking for representation of subsets. Additionally, the Travelling Salesman problem is approximated by the 2-APX using minimum
spanning trees. Since finding shortest-path distances between each target of the TSP is necessary for a good solution, this repo 
also provides an implementation of Dijkstra's algorithmn for this purpose. Targets can either be the current location, points of interest
which are selected by category or a marker on the map. Using the functionality can be done by either interfacing
the HTTP API or using the web application which is also part of this repo. This web application is built using react and leaflet. 
Screenshots:

## Installation

## Client

## Docker

