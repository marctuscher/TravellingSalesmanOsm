export function tsp_held_karp(source,targets){
    return {
        type: "TSP_HELD_KARP",
        source: source, 
        targets: targets
    }
}

export function calcRoute(source, target){
    return {
        type: "CALC_ROUTE",
        source: source, 
        target: target
    }
}

export function getCategories(){
    return {
        type:"GET_CATEGORIES"
    }
}

export function get_current_geolocation(){
    return {
        type: "GET_CURRENT_GEOLOCATION"
    }
}

export function addMarker(latlng, type){
    return {
        type: "ADD_MARKER",
        payload: {latlng: latlng, markerType: type}
    }
}

export function deleteMarker(index){
    return {
        type: "DELETE_MARKER",
        payload: index
    }
}

export function setTsp(value){
    return {
        type: "SET_TSP",
        payload: value
    }
}

export function setTspTarget(index){
    return {
        type: "SET_TSP_TARGET",
        payload: index
    }
}

export function unsetTspTarget(index){
    return {
        type: "UNSET_TSP_TARGET",
        payload: index
    }
}

export function setRoutingTarget(mode){
    return {
        type: "SET_ROUTING_TARGET", 
        mode: mode
    }
}

export function setTspSource(index){
    return {
        type: "SET_TSP_SOURCE",
        payload: index
    }
}
export function unsetTspSource(index){
    return {
        type: "UNSET_TSP_SOURCE",
        payload: index
    }
}
export function setRoutingSource(index){
    return {
        type: "SET_DIJKSTRA_SOURCE",
        payload: index
    }
}
export function unsetDijkstraSource(index){
    return {
        type: "UNSET_DIJKSTRA_SOURCE",
        payload: index
    }
}

