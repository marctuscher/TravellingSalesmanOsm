# TravellingSalesmanOsm

OpenStreetMap protobuf files as found on http://download.geofabrik.de/europe.html are read into an efficient internal
graph representation. Solving instances of the Travelling Salesman Problem is done using the [Held-Karp algorithmn](https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm)
with bitmasking for representation of subsets. Additionally, the Travelling Salesman problem is approximated by the 2-APX using minimum
spanning trees. Since finding shortest-path distances between each target of the TSP is necessary for a good solution, this repo 
also provides an implementation of Dijkstra's algorithmn for this purpose. Targets can either be the current location, points of interest
which are selected by category or a marker on the map. Using the functionality can be done by either interfacing
the HTTP API or using the web application which is also part of this repo. The web application is built using react and leaflet. A production build of the client is already included in the codebase. Parsing the OpenStreetMap files is done using [osmpbf](https://github.com/inphos42/osmpbf).
Screenshots:

## Installation

This installation guide focuses building the app on Ubuntu systems. Building on Windows or macOs is possible but additional steps, which are not covered by this guide, might be required to successfully build the binaries for such systems.

### Prerequisities
Be sure to have [Boost] (https://www.boost.org/), [protobuf](https://github.com/protocolbuffers/protobuf) at version 3.5.1 and zlib installed on your system.
Boost and zlib can be installed by the following command. 
```
sudo apt-get install libboost-all-dev zlib1g-dev
```
For protobuf, please follow the installation instructions on the protobuf github page.

### Building the server

Please clone this repo recursively:
```
git clone --recurse-submodules https://github.com/marctuscher/TravellingSalesmanOsm.git
```


## Client


## Docker

