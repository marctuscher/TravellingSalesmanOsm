import * as coreActions from "./actions"
const axios = require('axios')

function addMarkerAtCurrentLocation(store) {
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

function prepareDataTsp(targets, store) {
	targets.forEach((elem, index) => {
		if (elem.mode === "category") {
			elem.originLat = store.getState().core.position.latitude;
			elem.originLon = store.getState().core.position.longitude;
		}
	});
	return targets;
}

function processResult(res, action, store) {
	action.path = res.data.path.map((elem, id) => {
		return [Number(elem.lat), Number(elem.lon)]
	});
	if (res.data.markers === "") return action;
	res.data.markers.forEach((elem, index) => {
		let marker = {
			latlng: {
				lat: elem.lat,
				lng: elem.lon
			},
			tags: elem.tags,
			name: elem.tags.name ? elem.tags.name : null
		}
		store.dispatch({
			type: "ADD_MARKER",
			payload: marker
		})
	})
	return action;
}

function processPoiResult(res, action, store) {
	if (res.data.markers === ""){
		return action;
	}
	res.data.markers.forEach((elem, index) => {
		let marker = {
			latlng: {
				lat: elem.lat,
				lng: elem.lon
			},
			tags: elem.tags,
			name: elem.tags.name ? elem.tags.name : null
		}
		store.dispatch({
			type: "ADD_MARKER",
			payload: marker
		})
	})
	return action;
}

function getSecondsString(duration){
    var output = "";
    if (duration > 100000){
        duration = duration/1000000;
        output += duration.toFixed(4) + " s"
    }else{
        duration = duration/1000;
        output += duration + " ms"
    }
    return output;
}


const coreMiddleware = (function () {
	return store => next => action => {
		switch (action.type) {
			case "TSP_HELD_KARP":
				if (!action.source || action.targets.length === 0){
						store.dispatch(coreActions.createNotification({
							title: "Error",
							content: "Please select source and targets",
							type: "bad"
						}))
					break;
				}
				let targets = action.targets.slice();
				targets.unshift(action.source);
				targets = prepareDataTsp(targets, store);

				axios({
					method: 'POST',
					url: '/tspheldkarp',
					data: {
						targets: targets
					}
				}).then(res => {
					store.dispatch(coreActions.createNotification({
						title: "Optimal",
						sticky: true,
						appState: "tsp",
						content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' +
							'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' +
							'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' +
							'TSP: ' + getSecondsString(res.data["duration:compute"]) + '</br>' +
                            'Costs: ' + res.data.costs
					}));
					action = processResult(res, action, store);
					next(action)
				}).catch(err => {
					console.error(err)
				})
				break;
			case "APX":
				if (!action.source || action.targets.length === 0){
						store.dispatch(coreActions.createNotification({
							title: "Error",
							content: "Please select source and targets",
							type: "bad"
						}))
					break;
				}
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
					store.dispatch(coreActions.createNotification({
						title: "2-APX",
						sticky: true,
						appState: "tsp",
						content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' +
							'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' +
							'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' +
							'TSP: ' + getSecondsString(res.data["duration:compute"]) + '</br>' +
                            'Costs: ' + res.data.costs
					}));
					action = processResult(res, action, store);
					next(action)
				}).catch(err => {
					console.error(err)
				})
				break;
			case "POI":
				if (action.targets.length === 0){
						store.dispatch(coreActions.createNotification({
							title: "Error",
							content: "Please select categories to search for",
							type: "bad"
						}))
					break;
				}
				targets = action.targets.slice();
				targets = prepareDataTsp(targets, store)
				axios({
					method: 'POST',
					url: '/poi',
					data: {
						targets: targets
					}
				}).then(res => {
					if (res.data.markers === ""){
						store.dispatch(coreActions.createNotification({
							title: "Error",
							content: "Could not find any matching POI",
							type: "bad"
						}))
					}else {
						store.dispatch(coreActions.createNotification({
							title: "POI",
							sticky: true,
							appState: "poi",
							content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' +
								'Finding Nodes: ' + getSecondsString(res.data["duration:localization"])
						}));
					}
					action = processPoiResult(res, action, store);
					next(action)
				}).catch(err => {
					console.error(err)
				})
				break;


			case "CALC_ROUTE":
				if (!action.source || !action.target){
						store.dispatch(coreActions.createNotification({
							title: "Error",
							content: "Please select source and target",
							type: "bad"
						}))
					break;
				}
				action.data = {}
				action.data.sourceMode = action.source.mode;
				action.data.targetMode = action.target.mode;
				if (action.source.mode === "category") {
					action.data.sourceOriginLat = store.getState().core.position.latitude;
					action.data.sourceOriginLon = store.getState().core.position.longitude;
					action.data.sourceGroup = action.source.group;
					action.data.sourceCat = action.source.category;
				} else {
					action.data.sourceLat = action.source.latlng.lat;
					action.data.sourceLon = action.source.latlng.lng;
				}
				if (action.target.mode === "category") {
					action.data.targetOriginLat = store.getState().core.position.latitude;
					action.data.targetOriginLon = store.getState().core.position.longitude;
					action.data.targetGroup = action.target.group;
					action.data.targetCat = action.target.category;
				} else {
					action.data.targetLat = action.target.latlng.lat;
					action.data.targetLon = action.target.latlng.lng;
				}
				axios({
					method: 'POST',
					url: '/routebycoordinates',
					data: action.data
				}).then(res => {
					store.dispatch(coreActions.createNotification({
						title: "Dijkstra",
						sticky: true,
						appState: "routing",
						content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' +
							'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' +
							'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' +
                            'Costs: ' + res.data.costs
					}));
					action = processResult(res, action, store)
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
					for (let key in res.data) {
						let obj = {
							type: 'group',
							name: key,
							items: []
						};
						for (let item of res.data[key]) {
							obj.items.push({
								value: key + ":" + item,
								label: item,
							});
						}
						action.categories.push(obj);
					}
					next(action);
				});
				break;
			case "GET_CURRENT_GEOLOCATION":
				navigator.geolocation.getCurrentPosition(position => {
					action.position = position;
					next(action);
				});
				break;
			case "ADD_MARKER":
				
				action.exists = false;
				for (let marker of store.getState().core.markers) {
					if (marker.latlng.lat === action.payload.latlng.lat && marker.latlng.lng === action.payload.latlng.lng) {
						action.exists = true;
					}
				}
				if (!action.payload.tags) action.payload.tags = {}

				if (!action.exists) {
					// apparently the wikilocation api does not exist anymore
					//store.dispatch(coreActions.getMarkerDescription(store.getState().core.markers.length, action.payload.latlng.lat, action.payload.latlng.lng))
					next(action);
				}
				break;
			case "DELETE_MARKER":
				next(action)
				break;
			case "SET_APP_STATE":
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
				action.category = action.payload.value.split(':')[1];
				next(action)
				break;
			case "CHANGE_NUMBER_OF_ELEM_TSP":
				next(action)
				break;
			case "CHANGE_NUMBER_OF_ELEM_POI":
				next(action)
				break;
			case "ADD_CATEGORY_TSP_TARGET":
				next(action)
				break;
			case "ADD_CATEGORY_POI_TARGET":
				next(action)
				break;
			case "ADD_CURRENT_TSP_TARGET":
				addMarkerAtCurrentLocation(store);
				next(action)
				break;
			case "CHANGE_CATEGORY_TSP_TARGET":
				action.group = action.payload.value.split(':')[0];
				action.category = action.payload.value.split(':')[1];
				next(action)
				break;
			case "DELETE_TSP_TARGET":
				next(action);
				break;
			case "DELETE_POI_TARGET":
				next(action);
				break;
			case "ADD_TSP_MARKER_TARGET":
				next(action)
				break;
			case "SET_TSP_MARKER_SOURCE":
				next(action);
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
				action.category = action.payload.value.split(':')[1];
				next(action)
				break;
			case "CHANGE_CATEGORY_ROUTING_TARGET":
				action.group = action.payload.value.split(':')[0];
				action.category = action.payload.value.split(':')[1];
				next(action)
				break;
			case "CHANGE_CATEGORY_POI_TARGET":
				action.group = action.payload.value.split(':')[0];
				action.category = action.payload.value.split(':')[1];
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
			case "CLEAR_TSP":
				next(action);
				break
			case "CLEAR_ROUTING":
				next(action);
				break
			case "CLEAR_APX":
				next(action);
				break
			case "SET_ROUTING_TARGET_CURRENT":
				addMarkerAtCurrentLocation(store);
				next(action);
				break

			case 'CREATE_NOTIFICATION':

				// start a timeout to close this notification
				for (let note in store.getState().core.notifications){
					if (store.getState().core.notifications[note].title === action.notification.title){
						store.dispatch(coreActions.removeNotification(note));
					}
				}
				if (!action.notification.sticky) {
					var timeout = setTimeout(
						function () {
							store.dispatch(coreActions.removeNotification(action.notification.key))
						},
						action.notification.duration * 1000
					)
				}

				next(action);
				break;

			case 'CLOSE_NOTIFICATION':
				var notifications = Object.assign({}, store.getState().core.notifications);

				// start a timeout to remove this notification
				// This gives us time to animate out the notification before we remove the data
				var timeout = setTimeout(
					function () {
						store.dispatch(coreActions.removeNotification(action.key))
					},
					500
				)

				next(action);
				break;

			case 'REMOVE_NOTIFICATION':

				// Manual removal
				if (action.manual) {
					var notifications = Object.assign({}, store.getState().core.notifications);

					// If a broadcast, add to suppressed_broadcasts
					if (notifications[action.key] && notifications[action.key].type === 'broadcast') {
						store.dispatch({
							type: 'SUPPRESS_BROADCAST',
							key: action.key
						})
					}
				}

				next(action);
				break;
			case "CLEAR_MARKERS":
				next(action);
			break;
			case "GET_MARKER_DESCRIPTION":
				axios({
					method: "get",
					url: "http://api.wikilocation.org/articles?lat=" + action.lat + "&lng=" + action.lng +"&limit=1&radius=50",
				}).then(res=> {
					next(action);
				}).catch(err => {
					console.error(err)
				})
			break;
			default:
				break;
		}
	}
})();

export default coreMiddleware;
