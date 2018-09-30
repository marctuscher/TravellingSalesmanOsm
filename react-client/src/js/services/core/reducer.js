export default function reducer(core = {}, action){
    switch (action.type){
        case 'TSP_HELD_KARP':
            return {...core, tspPath: action.path}
        case "APX":
            return {...core, apxPath: action.path}
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
        case 'SET_TSP_SOURCE_CATEGORY':
            return {...core, tspSource: {group: null, category: null, mode: "category"}}
        case 'SET_TSP_SOURCE_CURRENT':
            return {...core, tspSource: {lat :core.position.latitude, lng: core.position.longitude, mode: "current"}}
        case 'DELETE_TSP_SOURCE':
            return {...core, tspSource: null}
        case 'CHANGE_CATEGORY_TSP_SOURCE':
            return {...core, tspSource: {...core.tspSource, group: action.group, category: action.category}}
        case 'ADD_CATEGORY_TSP_TARGET':
            return {...core, tspTargets: [...core.tspTargets, {group: null, category: null, mode: "category"}]}
        case 'ADD_CURRENT_TSP_TARGET':
            return {...core, tspTargets: [...core.tspTargets, {lat:core.position.latitude, lng: core.position.longitude, mode: "current"}]}
        case 'CHANGE_CATEGORY_TSP_TARGET':
            core.tspTargets[action.index] = {...core.tspTargets[action.index], group: action.group, category:action.category}
            return {...core}
        case 'DELETE_TSP_TARGET':
            return {...core, tspTargets: core.tspTargets.filter((item, index)=> index !== action.index)}
        case 'ADD_TSP_MARKER_TARGET':
            return {...core, tspTargets: [...core.tspTargets, {...core.markers[action.index].latlng, mode: "marker"}]}

        /** Routing stuff */
        case 'SET_ROUTING_SOURCE_MARKER':
            return {...core, dijkstraSource: {latlng: core.markers[action.payload].latlng, mode: "marker"}}
        case 'SET_ROUTING_SOURCE_CATEGORY':
            return {...core, dijkstraSource: {group: null, category: null, mode:"category"}}
        case 'SET_ROUTING_TARGET_MARKER':
            return {...core, dijkstraTarget: {latlng: core.markers[action.payload].latlng, mode: "marker"}}
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
            return {...core, dijkstraSource: {latlng: {lat: core.position.latitude, lng: core.position.longitude}, mode: "current"}}
        case 'SET_ROUTING_TARGET_CURRENT':
            return {...core, dijkstraTarget: {latlng: {lat: core.position.latitude, lng: core.position.longitude}, mode: "current"}}
        default:
            return core;
    }
}