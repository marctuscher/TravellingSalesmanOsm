webpackHotUpdate(0,{

/***/ "./src/js/services/core/middleware.js":
/*!********************************************!*\
  !*** ./src/js/services/core/middleware.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(/*! ./actions */ "./src/js/services/core/actions.js");

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

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
	});
}

function prepareDataTsp(targets, store) {
	targets.forEach(function (elem, index) {
		if (elem.mode === "category") {
			elem.originLat = store.getState().core.position.latitude;
			elem.originLon = store.getState().core.position.longitude;
		}
	});
	return targets;
}

function processResult(res, action, store) {
	action.path = res.data.path.map(function (elem, id) {
		return [Number(elem.lat), Number(elem.lon)];
	});
	if (res.data.markers === "") return action;
	res.data.markers.forEach(function (elem, index) {
		var marker = {
			latlng: {
				lat: elem.lat,
				lng: elem.lon
			},
			tags: elem.tags,
			name: elem.tags.name ? elem.tags.name : null
		};
		store.dispatch({
			type: "ADD_MARKER",
			payload: marker
		});
	});
	return action;
}

function processPoiResult(res, action, store) {
	if (res.data.markers === "") {
		return action;
	}
	res.data.markers.forEach(function (elem, index) {
		var marker = {
			latlng: {
				lat: elem.lat,
				lng: elem.lon
			},
			tags: elem.tags,
			name: elem.tags.name ? elem.tags.name : null
		};
		store.dispatch({
			type: "ADD_MARKER",
			payload: marker
		});
	});
	return action;
}

function getSecondsString(duration) {
	var output = "";
	if (duration > 100000) {
		duration = duration / 1000000;
		output += duration.toFixed(4) + " s";
	} else {
		duration = duration / 1000;
		output += duration + " ms";
	}
	return output;
}

var coreMiddleware = function () {
	return function (store) {
		return function (next) {
			return function (action) {
				switch (action.type) {
					case "TSP_HELD_KARP":
						if (!action.source || action.targets.length === 0) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Error",
								content: "Please select source and targets",
								type: "bad"
							}));
							break;
						}
						var targets = action.targets.slice();
						targets.unshift(action.source);
						targets = prepareDataTsp(targets, store);

						axios({
							method: 'POST',
							url: '/tspheldkarp',
							data: {
								targets: targets
							}
						}).then(function (res) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Optimal",
								sticky: true,
								appState: "tsp",
								content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' + 'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' + 'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' + 'TSP: ' + getSecondsString(res.data["duration:compute"]) + '</br>' + 'Costs: ' + res.data.costs
							}));
							action = processResult(res, action, store);
							next(action);
						}).catch(function (err) {
							console.error(err);
						});
						break;
					case "APX":
						if (!action.source || action.targets.length === 0) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Error",
								content: "Please select source and targets",
								type: "bad"
							}));
							break;
						}
						targets = action.targets.slice();
						targets.unshift(action.source);
						targets = prepareDataTsp(targets, store);
						axios({
							method: 'POST',
							url: '/apx',
							data: {
								targets: targets
							}
						}).then(function (res) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "2-APX",
								sticky: true,
								appState: "tsp",
								content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' + 'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' + 'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' + 'TSP: ' + getSecondsString(res.data["duration:compute"]) + '</br>' + 'Costs before swap: ' + res.data.costsBefore + '</br>' + 'Costs after swap: ' + res.data.costs
							}));
							action = processResult(res, action, store);
							next(action);
						}).catch(function (err) {
							console.error(err);
						});
						break;
					case "POI":
						if (action.targets.length === 0) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Error",
								content: "Please select categories to search for",
								type: "bad"
							}));
							break;
						}
						targets = action.targets.slice();
						targets = prepareDataTsp(targets, store);
						axios({
							method: 'POST',
							url: '/poi',
							data: {
								targets: targets
							}
						}).then(function (res) {
							if (res.data.markers === "") {
								store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
									title: "Error",
									content: "Could not find any matching POI",
									type: "bad"
								}));
							} else {
								store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
									title: "POI",
									sticky: true,
									appState: "poi",
									content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' + 'Finding Nodes: ' + getSecondsString(res.data["duration:localization"])
								}));
							}
							action = processPoiResult(res, action, store);
							next(action);
						}).catch(function (err) {
							console.error(err);
						});
						break;

					case "CALC_ROUTE":
						if (!action.source || !action.target) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Error",
								content: "Please select source and target",
								type: "bad"
							}));
							break;
						}
						action.data = {};
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
						}).then(function (res) {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["createNotification"]({
								title: "Dijkstra",
								sticky: true,
								appState: "routing",
								content: '<h6 style="color:#44bd32">Calculation Times:</h6></br>' + 'Finding Nodes: ' + getSecondsString(res.data["duration:localization"]) + '</br>' + 'Dijkstra: ' + getSecondsString(res.data["duration:dijkstra"]) + '</br>' + 'Costs: ' + res.data.costs
							}));
							action = processResult(res, action, store);
							next(action);
						}).catch(function (err) {
							console.error(err);
						});
						break;
					case "GET_CATEGORIES":
						axios({
							method: 'GET',
							url: '/categories'
						}).then(function (res) {
							action.categories = [];
							for (var key in res.data) {
								var obj = {
									type: 'group',
									name: key,
									items: []
								};
								var _iteratorNormalCompletion = true;
								var _didIteratorError = false;
								var _iteratorError = undefined;

								try {
									for (var _iterator = res.data[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										var item = _step.value;

										obj.items.push({
											value: key + ":" + item,
											label: item
										});
									}
								} catch (err) {
									_didIteratorError = true;
									_iteratorError = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion && _iterator.return) {
											_iterator.return();
										}
									} finally {
										if (_didIteratorError) {
											throw _iteratorError;
										}
									}
								}

								action.categories.push(obj);
							}
							next(action);
						});
						break;
					case "GET_CURRENT_GEOLOCATION":
						navigator.geolocation.getCurrentPosition(function (position) {
							action.position = position;
							next(action);
						});
						break;
					case "ADD_MARKER":

						action.exists = false;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = store.getState().core.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var marker = _step2.value;

								if (marker.latlng.lat === action.payload.latlng.lat && marker.latlng.lng === action.payload.latlng.lng) {
									action.exists = true;
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}

						if (!action.payload.tags) action.payload.tags = {};

						if (!action.exists) {
							// apparently the wikilocation api does not exist anymore
							//store.dispatch(coreActions.getMarkerDescription(store.getState().core.markers.length, action.payload.latlng.lat, action.payload.latlng.lng))
							next(action);
						}
						break;
					case "DELETE_MARKER":
						next(action);
						break;
					case "SET_APP_STATE":
						next(action);
						break;
					case "SET_TSP_SOURCE_CATEGORY":
						next(action);
						break;
					case "SET_TSP_SOURCE_CURRENT":
						addMarkerAtCurrentLocation(store);
						next(action);
						break;
					case "DELETE_TSP_SOURCE":
						next(action);
						break;
					case "CHANGE_CATEGORY_TSP_SOURCE":
						action.group = action.payload.value.split(':')[0];
						action.category = action.payload.value.split(':')[1];
						next(action);
						break;
					case "CHANGE_NUMBER_OF_ELEM_TSP":
						next(action);
						break;
					case "CHANGE_NUMBER_OF_ELEM_POI":
						next(action);
						break;
					case "ADD_CATEGORY_TSP_TARGET":
						next(action);
						break;
					case "ADD_CATEGORY_POI_TARGET":
						next(action);
						break;
					case "ADD_CURRENT_TSP_TARGET":
						addMarkerAtCurrentLocation(store);
						next(action);
						break;
					case "CHANGE_CATEGORY_TSP_TARGET":
						action.group = action.payload.value.split(':')[0];
						action.category = action.payload.value.split(':')[1];
						next(action);
						break;
					case "DELETE_TSP_TARGET":
						next(action);
						break;
					case "DELETE_POI_TARGET":
						next(action);
						break;
					case "ADD_TSP_MARKER_TARGET":
						next(action);
						break;
					case "SET_TSP_MARKER_SOURCE":
						next(action);
						break;

					/** Routing stuff**/
					case "SET_ROUTING_SOURCE_MARKER":
						next(action);
						break;
					case "SET_ROUTING_SOURCE_CATEGORY":
						next(action);
						break;
					case "SET_ROUTING_TARGET_MARKER":
						next(action);
						break;
					case "SET_ROUTING_TARGET_CATEGORY":
						next(action);
						break;
					case "CHANGE_CATEGORY_ROUTING_SOURCE":
						action.group = action.payload.value.split(':')[0];
						action.category = action.payload.value.split(':')[1];
						next(action);
						break;
					case "CHANGE_CATEGORY_ROUTING_TARGET":
						action.group = action.payload.value.split(':')[0];
						action.category = action.payload.value.split(':')[1];
						next(action);
						break;
					case "CHANGE_CATEGORY_POI_TARGET":
						action.group = action.payload.value.split(':')[0];
						action.category = action.payload.value.split(':')[1];
						next(action);
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
						break;
					case "CLEAR_TSP":
						next(action);
						break;
					case "CLEAR_ROUTING":
						next(action);
						break;
					case "CLEAR_APX":
						next(action);
						break;
					case "SET_ROUTING_TARGET_CURRENT":
						addMarkerAtCurrentLocation(store);
						next(action);
						break;

					case 'CREATE_NOTIFICATION':

						// start a timeout to close this notification
						for (var note in store.getState().core.notifications) {
							if (store.getState().core.notifications[note].title === action.notification.title) {
								store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["removeNotification"](note));
							}
						}
						if (!action.notification.sticky) {
							var timeout = setTimeout(function () {
								store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["removeNotification"](action.notification.key));
							}, action.notification.duration * 1000);
						}

						next(action);
						break;

					case 'CLOSE_NOTIFICATION':
						var notifications = Object.assign({}, store.getState().core.notifications);

						// start a timeout to remove this notification
						// This gives us time to animate out the notification before we remove the data
						var timeout = setTimeout(function () {
							store.dispatch(__WEBPACK_IMPORTED_MODULE_0__actions__["removeNotification"](action.key));
						}, 500);

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
								});
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
							url: "http://api.wikilocation.org/articles?lat=" + action.lat + "&lng=" + action.lng + "&limit=1&radius=50"
						}).then(function (res) {
							next(action);
						}).catch(function (err) {
							console.error(err);
						});
						break;
					default:
						break;
				}
			};
		};
	};
}();

/* harmony default export */ __webpack_exports__["a"] = (coreMiddleware);

/***/ })

})
//# sourceMappingURL=0.d832ae3ee3ae3d1b9ebb.hot-update.js.map