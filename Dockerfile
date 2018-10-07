FROM ubuntu:latest



RUN apt-get update
# install c++ ependencies
RUN apt install -y build-essential curl make cmake zlib1g-dev libboost-all-dev git gcc-7 g++-7 unzip

ENV PROTOBUF_VERSION=3.5.1

RUN curl -L -s https://github.com/google/protobuf/releases/download/v${PROTOBUF_VERSION}/protobuf-cpp-${PROTOBUF_VERSION}.tar.gz -o /tmp/protobuf.tar.gz \
	&& tar -xzf /tmp/protobuf.tar.gz -C /tmp \
	&& rm -f /tmp/protobuf.tar.gz \
	&& cd /tmp/protobuf-${PROTOBUF_VERSION} \
    && ./configure \
	&& make \
	&& make install \
	&& ldconfig \
	&& rm -rf /tmp/protobuf-${PROTOBUF_VERSION}
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash - && \
    apt-get install -y nodejs

WORKDIR /usr/app/
COPY . .
# installing node
# building the client
RUN cd react-client && \
    npm install && \
    npm run build && \
    cd ..
# building osmpbf
RUN cd osmpbf && \
    mkdir build && \
    cd build && \
    cmake .. && \
    make

# building application binary 
RUN cd src &&  \
    make

EXPOSE 8080

WORKDIR /usr/app/src

CMD /usr/app/src/main.out /usr/app/data/$FILENAME /usr/app/data/config.json

