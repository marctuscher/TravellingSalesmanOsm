export function tsp_held_karp(targets){
    return {
        type: "TSP_HELD_KARP",
        payload: targets
    }
}

export function set_current_geolocation(position){
    return {
        type: "SET_CURRENT_GEOLOCATION",
        geolocation: position
    }
}