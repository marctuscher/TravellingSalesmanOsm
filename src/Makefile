CXXFLAGS= -std=c++11 -Wall -g -march=native -O3
TARGETOS= $(shell uname -s)

ifeq ($(TARGETOS), Darwin)
    LIBS=-losmpbf -lprotobuf -lz -pthread -lboost_thread-mt -lboost_system -lboost_filesystem
else 
    LIBS=-losmpbf -lprotobuf -lz -pthread -lboost_thread -lboost_system -lboost_filesystem
endif

LIB=-L ./../osmpbf/build/osmpbf/
INC=-I ./include/ -I ../osmpbf/osmpbf/include -I ../osmpbf -I ./ -I ../Simple-Web-Server/
INC_DEBUG=-I ./include/ -I ../osmpbf/osmpbf/include -I ../osmpbf -I ./
LIBS_DEBUG=-losmpbf -lprotobuf -lz 


default:
	rm -f main.out
	g++ $(CXXFLAGS) $(INC) $(LIB) edge.cpp node.cpp graph.cpp graphreader.cpp search.cpp dynprog.cpp webserver.cpp main.cpp $(LIBS) -o main.out
debug:
	rm -f debug.out
	g++ $(CXXFLAGS) $(INC_DEBUG) $(LIB) edge.cpp node.cpp graph.cpp graphreader.cpp search.cpp dynprog.cpp main_test.cpp $(LIBS_DEBUG) -o debug.out
