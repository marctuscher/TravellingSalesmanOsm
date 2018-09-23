export default function reducer(core = {}, action){
    switch (action.type){
        case 'TSP_HELD_KARP':
            return {...core, path: action.path}
        case 'GET_CURRENT_GEOLOCATION':
            return {...core, position: {latitude: action.position.coords.latitude, longitude: action.position.coords.longitude}}
        case 'ADD_MARKER':
            return {...core, markers: [...core.markers, action.payload]}
        case 'DELETE_MARKER':
            return {...core, markers: core.markers.filter((item, index)=> index !== action.payload)}
        case 'SET_TSP':
            return {...core, tsp: action.payload}
        case 'SET_TSP_TARGET':
            core.markers[action.payload].tsp_target = true
            return {...core}
        case 'UNSET_TSP_TARGET':
            core.markers[action.payload].tsp_target = false
            return {...core}
        case 'SET_DIJKSTRA_TARGET':
            core.markers.map((elem, id) => {
                return elem.dijkstra_target = false;
            })
            core.markers[action.payload].dijkstra_target = true
            return {...core}
        case 'UNSET_DIJKSTRA_TARGET':
            core.markers[action.payload].dijsktra_target = true
            return {...core}
        case 'SET_TSP_SOURCE':
            core.markers.map((elem, id) => {
                return elem.tsp_source = false;
            })
            core.markers[action.payload].tsp_source = true
            return core
        case 'UNSET_TSP_SOURCE':
            core.markers[action.payload].tsp_source = false
            return {...core}
        case 'SET_DIJKSTRA_SOURCE':
            core.markers.map((elem, id) => {
                return elem.dijkstra_source = false;
            })
            core.markers[action.payload].dijkstra_source = true
            return {...core}
        case 'UNSET_DIJKSTRA_SOURCE':
            core.markers[action.payload].dijkstra_source = false
            return {...core}
        default:
            return core;
    }
}