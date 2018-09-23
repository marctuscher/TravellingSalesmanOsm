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
        default:
            return core;
    }
}