const axios = require('axios')



const coreMiddleware = (function () {
    return store => next => action => {
        switch (action.type){
            case "TSP_HELD_KARP":
            let targets = action.targets;
            targets.unshift(action.source);
            axios({
                method: 'POST', 
                url: '/tspheldkarp',
                data: {
                    targets: targets
                }
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
            case "GET_CATEGORIES":
                axios({
                    method: 'GET',
                    url: '/categories'
                }).then(res => {
                    action.categories = [];
                    for (let key in res.data){
                        let obj = {
                            type: 'group', 
                            name: key,
                            items: []
                        };
                        for (let item of res.data[key]){
                            obj.items.push({
                                value: item, 
                                label: item
                            });
                        }
                    action.categories.push(obj);
                    }
                    next(action);
                });
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