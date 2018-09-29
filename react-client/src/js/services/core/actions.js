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



export function setTspSource(index){
    return {
        type: "SET_TSP_SOURCE",
        payload: index
    }
}

export function setRoutingSourceCurrent(){
    return {
        type: "SET_ROUTING_SOURCE_CURRENT"
    }
}
export function setRoutingTargetCurrent(){
    return {
        type: "SET_ROUTING_TARGET_CURRENT"
    }
}

export function setRoutingSourceMarker(index){
    return {
        type: "SET_ROUTING_SOURCE_MARKER",
        payload: index
    }
}
export function setRoutingSourceCategory(){
    return {
        type: "SET_ROUTING_SOURCE_CATEGORY"
    }
}
export function setRoutingTargetMarker(index){
    return {
        type: "SET_ROUTING_TARGET_MARKER",
        payload: index
    }
}
export function setRoutingTargetCategory(){
    return {
        type: "SET_ROUTING_TARGET_CATEGORY"
    }
}

export function changeCategoryRoutingSource(cat){
    return {
        type: "CHANGE_CATEGORY_ROUTING_SOURCE",
        payload:cat
    }
}

export function changeCategoryRoutingTarget(cat){
    return {
        type: "CHANGE_CATEGORY_ROUTING_TARGET",
        payload:cat
    }
}

export function deleteRoutingTarget(){
    return {
        type: "DELETE_ROUTING_TARGET"
    }
}
export function deleteRoutingSource(){
    return {
        type: "DELETE_ROUTING_SOURCE"
    }
}
