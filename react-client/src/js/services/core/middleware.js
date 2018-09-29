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
            action.data = {}
            action.data.sourceMode = action.source.mode;
            action.data.targetMode = action.target.mode;
            if (action.source.mode === "category"){
                action.data.sourceOriginLat =  store.getState().core.position.latitude;
                action.data.sourceOriginLon =  store.getState().core.position.longitude;
                action.data.sourceGroup = action.source.group;
                action.data.sourceCat = action.source.category;
            }else{
                action.data.sourceLat = action.source.lat;
                action.data.sourceLon = action.source.lng;
            }
            if (action.source.mode === "category"){
                action.data.targetOriginLat =  store.getState().core.position.latitude;
                action.data.targetOriginLon =  store.getState().core.position.longitude;
                action.data.targetGroup = action.target.group;
                action.data.targetCat = action.target.category;
            }else{
                action.data.targetLat = action.target.lat;
                action.data.targetLon = action.target.lng;
            }
            axios({
                method: 'POST',
                url: '/routebycoordinates',
                data : action.data
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
                                value: key +":"+item, 
                                label: item, 
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
            case "SET_ROUTING_TARGET":
                next(action)
            break;
            case "SET_TSP_SOURCE":
                next(action)
            break;
            case "SET_ROUTING_SOURCE_MARKER":
                next(action)
            break;
            case "SET_ROUTING_SOURCE_CATEGORY":
                next(action)
            break;
            case "SET_ROUTING_TARGET_MARKER":
                next(action)
            break;
            case "SET_ROUTING_TARGET_CATEGORY":
                next(action)
            break;
            case "CHANGE_CATEGORY_ROUTING_SOURCE":
                action.group = action.payload.value.split(':')[0];
                action.category =action.payload.value.split(':')[1];
                next(action)
            break;
            case "CHANGE_CATEGORY_ROUTING_TARGET":
                action.group = action.payload.value.split(':')[0];
                action.category =action.payload.value.split(':')[1];
                next(action)
            break;
            case "DELETE_ROUTING_SOURCE":
                next(action);
            break;
            case "DELETE_ROUTING_TARGET":
                next(action);
            break;
            case "SET_ROUTING_SOURCE_CURRENT":
                next(action);
            break
            case "SET_ROUTING_TARGET_CURRENT":
                next(action);
            break
            default:
                break;
        }
    }
})();

export default coreMiddleware;