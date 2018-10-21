webpackHotUpdate(0,{

/***/ "./src/js/components/MapView.js":
/*!**************************************!*\
  !*** ./src/js/components/MapView.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_core_actions__ = __webpack_require__(/*! ../services/core/actions */ "./src/js/services/core/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_leaflet__ = __webpack_require__(/*! react-leaflet */ "./node_modules/react-leaflet/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet_dist_leaflet_css__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet_dist_leaflet_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_leaflet_dist_leaflet_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_components_TSPComponent_css__ = __webpack_require__(/*! ../../css/components/TSPComponent.css */ "./src/css/components/TSPComponent.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_components_TSPComponent_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__css_components_TSPComponent_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_components_MapView_css__ = __webpack_require__(/*! ../../css/components/MapView.css */ "./src/css/components/MapView.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_components_MapView_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__css_components_MapView_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__RoutingMap__ = __webpack_require__(/*! ./RoutingMap */ "./src/js/components/RoutingMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__TspMap__ = __webpack_require__(/*! ./TspMap */ "./src/js/components/TspMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MarkerComponent__ = __webpack_require__(/*! ./MarkerComponent */ "./src/js/components/MarkerComponent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_components_SidebarContent_css__ = __webpack_require__(/*! ../../css/components/SidebarContent.css */ "./src/css/components/SidebarContent.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_components_SidebarContent_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__css_components_SidebarContent_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__fortawesome_free_solid_svg_icons__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
var _jsxFileName = '/Users/marc/git/uni/osm-fapra/react-client/src/js/components/MapView.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















// Making markers work without having to use the google CDN
// https://github.com/PaulLeCam/react-leaflet/issues/453



delete __WEBPACK_IMPORTED_MODULE_12_leaflet___default.a.Icon.Default.prototype._getIconUrl;

__WEBPACK_IMPORTED_MODULE_12_leaflet___default.a.Icon.Default.mergeOptions({
	iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
	shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
});

var MapView = function (_React$Component) {
	_inherits(MapView, _React$Component);

	function MapView(props) {
		_classCallCheck(this, MapView);

		var _this = _possibleConstructorReturn(this, (MapView.__proto__ || Object.getPrototypeOf(MapView)).call(this, props));

		_this.mapRef = Object(__WEBPACK_IMPORTED_MODULE_0_react__["createRef"])();

		_this.handleMapClick = function (e) {
			_this.props.coreActions.addMarker(e.latlng, "standard");
		};

		_this.longitudes = [8, 9, 10, 11];
		_this.latitudes = [38, 39, 40, 41];

		_this.props.coreActions.get_current_geolocation();
		_this.clearMarkers = _this.clearMarkers.bind(_this);
		return _this;
	}

	_createClass(MapView, [{
		key: 'renderClickMarkers',
		value: function renderClickMarkers() {
			var _this2 = this;

			return this.props.markers.map(function (marker, i) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__MarkerComponent__["a" /* default */], {
					key: i,
					coord: marker.latlng,
					type: marker.type,
					marker: marker,
					index: i, __source: {
						fileName: _jsxFileName,
						lineNumber: 49
					},
					__self: _this2
				});
			});
		}
	}, {
		key: 'clearMarkers',
		value: function clearMarkers() {
			this.props.coreActions.clearMarkers();
		}
	}, {
		key: 'renderMap',
		value: function renderMap() {
			if (this.props.appState === "tsp") {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__TspMap__["a" /* default */], {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 66
					},
					__self: this
				});
			} else if (this.props.appState === "routing") {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__RoutingMap__["a" /* default */], {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 70
					},
					__self: this
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var position = [this.props.position.latitude, this.props.position.longitude];
			var style = {
				stroke: 'green',
				"stroke-dasharray": "10,10"
			};
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				__WEBPACK_IMPORTED_MODULE_4_react_leaflet__["a" /* Map */],
				{ className: 'map-view',
					center: position,
					zoom: this.props.zoom,
					onClick: this.handleMapClick,
					ref: this.mapRef,
					zoomControl: false,
					__source: {
						fileName: _jsxFileName,
						lineNumber: 85
					},
					__self: this
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'box', __source: {
							fileName: _jsxFileName,
							lineNumber: 92
						},
						__self: this
					},
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'button',
						{ className: 'btn-clear', onClick: this.clearMarkers, __source: {
								fileName: _jsxFileName,
								lineNumber: 93
							},
							__self: this
						},
						'ClearMarkers'
					)
				),
				this.renderClickMarkers(),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_leaflet__["e" /* TileLayer */], {
					attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
					url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', __source: {
						fileName: _jsxFileName,
						lineNumber: 96
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 5 }, { lat: 60, lng: 5 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 100
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 6 }, { lat: 60, lng: 6 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 101
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 7 }, { lat: 60, lng: 7 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 102
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 8 }, { lat: 60, lng: 8 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 103
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 9 }, { lat: 60, lng: 9 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 104
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 10 }, { lat: 60, lng: 10 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 105
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 11 }, { lat: 60, lng: 11 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 106
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 12 }, { lat: 60, lng: 12 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 107
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 13 }, { lat: 60, lng: 13 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 108
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 14 }, { lat: 60, lng: 14 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 109
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 40, lng: 15 }, { lat: 60, lng: 15 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 110
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 45, lng: 0 }, { lat: 45, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 113
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 46, lng: 0 }, { lat: 46, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 114
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 47, lng: 0 }, { lat: 47, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 115
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 48, lng: 0 }, { lat: 48, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 116
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 49, lng: 0 }, { lat: 49, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 117
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 50, lng: 0 }, { lat: 50, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 118
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 51, lng: 0 }, { lat: 51, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 119
					},
					__self: this
				}),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('polyline', { positions: [{ lat: 52, lng: 0 }, { lat: 52, lng: 20 }], __source: {
						fileName: _jsxFileName,
						lineNumber: 120
					},
					__self: this
				})
			);
		}
	}]);

	return MapView;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		appState: state.core.appState,
		position: state.core.position,
		path: state.core.path,
		zoom: state.core.zoom,
		markers: state.core.markers
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		coreActions: Object(__WEBPACK_IMPORTED_MODULE_1_redux__["b" /* bindActionCreators */])(__WEBPACK_IMPORTED_MODULE_3__services_core_actions__, dispatch)
	};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(MapView));

/***/ })

})
//# sourceMappingURL=0.e77cabc85b882f53216e.hot-update.js.map