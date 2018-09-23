export function tsp_held_karp(targets){
    return {
        type: "TSP_HELD_KARP",
        payload: targets
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

export function unsetDijkstraTarget(index){
    return {
        type: "SET_DIJKSTRA_TARGET", 
        payload: index
    }
}
export function setDijkstraTarget(index){
    return {
        type: "UNSET_DIJKSTRA_TARGET", 
        payload: index
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
export function setDijkstraSource(index){
    return {
        type: "SET_DIJSKTRA_SOURCE",
        payload: index
    }
}
export function unsetDijkstraSource(index){
    return {
        type: "UNSET_DIJSKTRA_SOURCE",
        payload: index
    }
}