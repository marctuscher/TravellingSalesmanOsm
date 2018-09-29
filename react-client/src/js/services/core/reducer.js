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
        case 'SET_TSP_TARGET':
            return {...core, tspTargets: [...core.tspTargets,core.markers[action.payload].latlng ]}
        case 'SET_TSP_SOURCE':
            return {...core, tspSource: core.markers[action.payload].latlng}
        case 'SET_ROUTING_SOURCE_MARKER':
            return {...core, dijkstraSource: {latlng: core.markers[action.payload].latlng, mode: "marker"}}
        case 'SET_ROUTING_SOURCE_CATEGORY':
            return {...core, dijkstraSource: {group: null, category: null, mode:"category"}}
        case 'SET_ROUTING_TARGET_MARKER':
            return {...core, dijkstraSource: {latlng: core.markers[action.payload].latlng, mode: "marker"}}
        case 'SET_ROUTING_TARGET_CATEGORY':
            return {...core, dijkstraTarget: {group: null, category: null, mode:"category"}}
        case 'CHANGE_CATEGORY_ROUTING_SOURCE':
            return {...core, dijkstraSource: {...core.dijkstraSource, group: action.group, category: action.category}}
        case 'CHANGE_CATEGORY_ROUTING_TARGET':
            return {...core, dijkstraTarget: {...core.dijkstraTarget, group: action.group, category: action.category}}
        case 'DELETE_ROUTING_SOURCE':
            return {...core, dijkstraSource: null}
        case 'DELETE_ROUTING_TARGET':
            return {...core, dijkstraTarget: null}
        case 'SET_ROUTING_SOURCE_CURRENT':
            return {...core, dijkstraSource: {latlng: core.position, mode: "current"}}
        case 'SET_ROUTING_TARGET_CURRENT':
            return {...core, dijkstraTarget: {latlng: core.position, mode: "current"}}
        default:
            return core;
    }
}