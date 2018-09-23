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