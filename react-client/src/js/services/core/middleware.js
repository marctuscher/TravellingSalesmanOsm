const axios = require('axios')


function addMarkerAtCurrentLocation(store){
                store.dispatch({
                    type: "ADD_MARKER",
                    payload: {
                        latlng: {
                            lat: store.getState().core.position.latitude,
                            lng: store.getState().core.position.longitude
                        },
                        markerType: "normal",
                        text: "Your current location"
                    }
                })
}
function prepareDataTsp(targets, store){
       targets.forEach((elem, index) => {
           if(elem.mode === "category"){
               elem.originLat = store.getState().core.position.latitude;
               elem.originLon = store.getState().core.position.longitude
           }
       });
       return targets;
}


const coreMiddleware = (function () {
    return store => next => action => {
        switch (action.type){
            case "TSP_HELD_KARP":
            let targets = action.targets.slice();
            targets.unshift(action.source);
            targets = prepareDataTsp(targets, store)
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
            case "APX":
            targets = action.targets.slice();
            targets.unshift(action.source);
            targets = prepareDataTsp(targets, store)
            axios({
                method: 'POST', 
                url: '/apx',
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
                action.data.sourceLat = action.source.latlng.lat;
                action.data.sourceLon = action.source.latlng.lng;
            }
            if (action.target.mode === "category"){
                action.data.targetOriginLat =  store.getState().core.position.latitude;
                action.data.targetOriginLon =  store.getState().core.position.longitude;
                action.data.targetGroup = action.target.group;
                action.data.targetCat = action.target.category;
            }else{
                action.data.targetLat = action.target.latlng.lat;
                action.data.targetLon = action.target.latlng.lng;
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
                if (action.payload in store.getState().core.markers) break;
                next(action)
            break;
            case "DELETE_MARKER":
                next(action)
            break;
            case "SET_TSP":
                next(action)
            break;
            case "SET_TSP_SOURCE_CATEGORY":
                next(action)
            break;
            case "SET_TSP_SOURCE_CURRENT":
                addMarkerAtCurrentLocation(store);
                next(action)
            break;
            case "DELETE_TSP_SOURCE":
                next(action);
            break;
            case "CHANGE_CATEGORY_TSP_SOURCE":
                action.group = action.payload.value.split(':')[0];
                action.category =action.payload.value.split(':')[1];
                next(action)
            break;
            case "ADD_CATEGORY_TSP_TARGET":
                next(action)
            break;
            case "ADD_CURRENT_TSP_TARGET":
                addMarkerAtCurrentLocation(store);
                next(action)
            break;
            case "CHANGE_CATEGORY_TSP_TARGET":
                action.group = action.payload.value.split(':')[0];
                action.category =action.payload.value.split(':')[1];
                next(action)
            break;
            case "DELETE_TSP_TARGET":
                next(action);
            break;
            case "ADD_TSP_MARKER_TARGET":
                next(action)
            break;

            /** Routing stuff**/
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
                addMarkerAtCurrentLocation(store);
                next(action);
            break
            case "SET_ROUTING_TARGET_CURRENT":
                addMarkerAtCurrentLocation(store);
                next(action);
            break
            default:
                break;
        }
    }
})();

export default coreMiddleware;