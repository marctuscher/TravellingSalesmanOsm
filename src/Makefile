CXXFLAGS= -std=c++11 -Wall -g


LIB=-L ./../osmpbf/build/osmpbf/
INC=-I ./include/ -I ../osmpbf/osmpbf/include -I ../osmpbf -I ./ -I ../Simple-Web-Server/
LIBS=-losmpbf -lprotobuf -lz -pthread -lboost_thread-mt -lboost_system -lboost_filesystem


default:
	g++ $(CXXFLAGS) $(INC) $(LIB) edge.cpp node.cpp graph.cpp graphreader.cpp search.cpp webserver.cpp main.cpp $(LIBS) -o main
test:
	g++ $(CXXFLAGS) $(INC) $(LIB) edge.cpp node.cpp graph.cpp graphreader.cpp search.cpp dynprog.cpp main_test.cpp $(LIBS) -o test
