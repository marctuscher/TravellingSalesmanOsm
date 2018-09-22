export default function reducer(core = {}, action){
    switch (action.type){
        case 'TSP_HELD_KARP':
            return {...core, path: action.path}
        case 'SET_CURRENT_GEOLOCATION':
            return {...core, geolocation: action.geolocation}
        default:
            return core;
    }
}