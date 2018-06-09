CXXFLAGS=-O3 -std=c++11 -Wall -ggdb3


LIB=-L ./../osmpbf/build/osmpbf/
INC=-I ./include/ -I ../osmpbf/osmpbf/include -I ../osmpbf -I ./ -I ../Simple-Web-Server/
LIBS=-losmpbf -lprotobuf -lz -pthread -lboost_thread -lboost_system -lboost_filesystem

src:
	g++ $(CXXFLAGS) $(INC) $(LIB) edge.cpp node.cpp graph.cpp graphreader.cpp search.cpp webserver.cpp main.cpp $(LIBS) -o main
