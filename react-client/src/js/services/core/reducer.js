export default function reducer(core = {}, action){
    switch (action.type){
        case 'TSP_HELD_KARP':
            return {...core, tspPath: action.path}
        case 'CALC_ROUTE':
            return {...core, routePath: action.path}
        case 'GET_CATEGORIES':
            return {...core, categories: action.categories}
        case 'GET_CURRENT_GEOLOCATION':
            return {...core, position: {latitude: action.position.coords.latitude, longitude: action.position.coords.longitude}}
        case 'ADD_MARKER':
            return {...core, markers: [...core.markers, action.payload]}
        case 'DELETE_MARKER':
            return {...core, markers: core.markers.filter((item, index)=> index !== action.payload)}
        case 'SET_TSP':
            return {...core, tsp: action.payload}
        case 'UNSET_TSP_TARGET':
            core.markers[action.payload].tsp_target = false
            return {...core}
        case 'SET_TSP_TARGET':
            return {...core, tspTargets: [...core.tspTargets,core.markers[action.payload].latlng ]}
        case 'SET_ROUTING_TARGET':
            return {...core, dijkstraTarget : core.markers[action.payload].latlng}
        case 'UNSET_DIJKSTRA_TARGET':
            core.markers[action.payload].dijsktra_target = true
            return {...core}
        case 'SET_TSP_SOURCE':
            return {...core, tspSource: core.markers[action.payload].latlng}
        case 'UNSET_TSP_SOURCE':
            core.markers[action.payload].tsp_source = false
            return {...core}
        case 'SET_DIJKSTRA_SOURCE':
            return {...core, dijkstraSource: core.markers[action.payload].latlng}
        case 'UNSET_DIJKSTRA_SOURCE':
            core.markers[action.payload].dijkstra_source = false
            return {...core}
        default:
            return core;
    }
}