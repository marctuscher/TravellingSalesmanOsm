const axios = require('axios')



const coreMiddleware = (function () {
    return store => next => action => {
        switch (action.type){
            case "TSP_HELD_KARP":
            axios({
                method: 'POST', 
                url: '/tspheldkarp',
                data: {
                    targets: [
                    50, 4000, 1000, 20000
                ]}
            }).then(res => {
                action.path = res.data.path.map((elem, id)=> {
                    return [Number(elem.lat), Number(elem.lon)]
                });
                next(action)
            }).catch(err => {
                console.error(err)
            })
                break;
            case "CALC_ROUTE":
            axios({
                method: 'POST',
                url: '/routebycoordinates',
                data: {
                    sourceLat: action.source.lat,
                    sourceLon: action.source.lng,
                    targetLat: action.target.lat,
                    targetLon: action.target.lng
                }
            }).then(res => {
                action.path = res.data.path.map((elem, id)=> {
                    return [Number(elem.lat), Number(elem.lon)]
                })
                next(action);
            }).catch(err => {
                console.error(err)
            })
            break;
            case "GET_CURRENT_GEOLOCATION":
                navigator.geolocation.getCurrentPosition(position=> {
                    action.position = position;
                    next(action);
                });
            break;
            case "ADD_MARKER":
                next(action)
            break;
            case "DELETE_MARKER":
                next(action)
            break;
            case "SET_TSP":
                next(action)
            break;
            case "SET_TSP_TARGET":
                next(action)
            break;
            case "UNSET_TSP_TARGET":
                next(action)
            break;
            case "SET_ROUTING_TARGET":
                next(action)
            break;
            case "UNSET_DIJKSTRA_TARGET":
                next(action)
            break;
            case "SET_DIJKSTRA_SOURCE":
                next(action)
            break;
            case "UNSET_DIJKSTRA_SOURCE":
                next(action)
            break;
            case "SET_TSP_SOURCE":
                next(action)
            break;
            case "UNSET_TSP_SOURCE":
                next(action)
            break;
            default:
                break;
        }
    }
})();

export default coreMiddleware;