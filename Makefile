CXXFLAGS=-std=c++11 -Wall


LIB=-L ./../osmpbf/build/osmpbf/
INC=-I ./include/ -I ../osmpbf/osmpbf/include -I ../osmpbf
LIBS=-losmpbf -lprotobuf -lz -pthread
src:
	g++ $(CXXFLAGS) $(INC) $(LIB)  graph.cpp graphreader.cpp main.cpp $(LIBS) -o main
