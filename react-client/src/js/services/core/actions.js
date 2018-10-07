
function fillNotification(data){
    var notification = Object.assign(
        {
            key: new Date().valueOf().toString(),
            duration: 5,
            type: 'default',
            title: null,
            content: null,
            description: null,
            sticky: false,
            closing: false,
        })

   if (typeof data.title !== 'undefined' ) notification.title = data.title
   if (typeof data.content !== 'undefined' ) notification.content = data.content
   if (typeof data.description !== 'undefined' ) notification.description = data.description
   if (typeof data.sticky !== 'undefined' ) notification.sticky = data.sticky
   if (typeof data.closing !== 'undefined' ) notification.closing = data.closing
   if (typeof data.type !== 'undefined') notification.type = data.type
   if (typeof data.appState !== 'undefined') notification.appState = data.appState
   console.log(notification)
    
   return notification
}


export function tsp_held_karp(source,targets){
    return {
        type: "TSP_HELD_KARP",
        source: source, 
        targets: targets
    }
}

export function apx(source, targets){
    return {
        type: "APX",
        source: source, 
        targets: targets
    }
}

export function calcPoi(targets){
    return {
        type: "POI",
        targets: targets
    }
}

export function clearTsp(){
    return {
        type: "CLEAR_TSP"
    }
}

export function clearRouting(){
    return {
        type: "CLEAR_ROUTING"
    }
}

export function clearApx(){
    return {
        type: "CLEAR_APX"
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

export function addMarker(latlng, type, text){
    return {
        type: "ADD_MARKER",
        payload: {latlng: latlng, markerType: type, text: text}
    }
}

export function deleteMarker(index){
    return {
        type: "DELETE_MARKER",
        payload: index
    }
}

export function setAppState(value){
    return {
        type: "SET_APP_STATE",
        payload: value
    }
}



export function setTspSourceCategory(){
    return {
        type: "SET_TSP_SOURCE_CATEGORY"
    }
}
export function setTspSourceCurrent(){
    return {
        type: "SET_TSP_SOURCE_CURRENT"
    }
}
export function deleteTspSource(){
    return {
        type: "DELETE_TSP_SOURCE"
    }
}
export function changeCategoryTspSource(cat){
    return {
        type: "CHANGE_CATEGORY_TSP_SOURCE",
        payload:cat
    }
}

export function addCategoryTspTarget(){
    return {
        type: "ADD_CATEGORY_TSP_TARGET"
    }
}
export function addCurrentTspTarget(){
    return {
        type: "ADD_CURRENT_TSP_TARGET"
    }
}

export function changeCategoryTspTarget(cat, index){
    return {
        type: "CHANGE_CATEGORY_TSP_TARGET",
        payload: cat, 
        index: index
    }
}

export function deleteTspTarget(index){
    return {
        type: "DELETE_TSP_TARGET",
        index: index
    }
}
export function addTspMarkerTarget(index){
    return {
        type:"ADD_TSP_MARKER_TARGET",
        index: index
    }
}

export function setTspMarkerSource(index){
    return {
        type: "SET_TSP_MARKER_SOURCE",
        index: index
    }
}

export function changeNumberOfElemTsp(value, index){
    return {
        type: "CHANGE_NUMBER_OF_ELEM_TSP", 
        index: index,
        payload: value
    }
}
export function changeNumberOfElemPoi(value, index){
    return {
        type: "CHANGE_NUMBER_OF_ELEM_POI", 
        index: index,
        payload: value
    }
}

export function clearMarkers(){
    return {
        type: "CLEAR_MARKERS"
    }
}




/** Routing stuff */
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

/** POI stuff */

export function addCategoryPoiTarget(){
    return {
        type: "ADD_CATEGORY_POI_TARGET"
    }
}
export function changeCategoryPoiTarget(cat, index){
    return {
        type: "CHANGE_CATEGORY_POI_TARGET",
        payload: cat, 
        index: index
    }
}
export function deletePoiTarget(index){
    return {
        type: "DELETE_POI_TARGET",
        index: index
    }
}
export function createNotification(data){
    return {
        type: 'CREATE_NOTIFICATION',
        notification: fillNotification(data)
    }
}
export function closeNotification(key){
    return { 
        type: 'CLOSE_NOTIFICATION',
        key: key
    }
}

export function removeNotification(key, manual = false){
    return { 
        type: 'REMOVE_NOTIFICATION',
        key: key,
        manual: manual
    }
}