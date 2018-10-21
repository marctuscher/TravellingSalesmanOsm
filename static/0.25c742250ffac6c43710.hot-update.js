webpackHotUpdate(0,{

/***/ "./node_modules/axios/index.js":
false,

/***/ "./node_modules/axios/lib/adapters/xhr.js":
false,

/***/ "./node_modules/axios/lib/axios.js":
false,

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
false,

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
false,

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
false,

/***/ "./node_modules/axios/lib/core/Axios.js":
false,

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
false,

/***/ "./node_modules/axios/lib/core/createError.js":
false,

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
false,

/***/ "./node_modules/axios/lib/core/enhanceError.js":
false,

/***/ "./node_modules/axios/lib/core/settle.js":
false,

/***/ "./node_modules/axios/lib/core/transformData.js":
false,

/***/ "./node_modules/axios/lib/defaults.js":
false,

/***/ "./node_modules/axios/lib/helpers/bind.js":
false,

/***/ "./node_modules/axios/lib/helpers/btoa.js":
false,

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
false,

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
false,

/***/ "./node_modules/axios/lib/helpers/cookies.js":
false,

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
false,

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
false,

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
false,

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
false,

/***/ "./node_modules/axios/lib/helpers/spread.js":
false,

/***/ "./node_modules/axios/lib/utils.js":
false,

/***/ "./node_modules/is-buffer/index.js":
false,

/***/ "./src/js/bootstrap.js":
/*!*****************************!*\
  !*** ./src/js/bootstrap.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_core_middleware__ = __webpack_require__(/*! ./services/core/middleware */ "./src/js/services/core/middleware.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_core_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__services_core_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_core_reducer__ = __webpack_require__(/*! ./services/core/reducer */ "./src/js/services/core/reducer.js");






var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["c" /* combineReducers */])({
    core: __WEBPACK_IMPORTED_MODULE_4__services_core_reducer__["a" /* default */]
});

var initialState = {
    core: {
        position: {
            latitude: 48.78232,
            longitude: 9.17702
        },
        zoom: 13,
        markers: [],
        appState: "tsp",
        tspTargets: [],
        poiTargets: [],
        notifications: {}
    }
};

initialState.core = Object.assign({}, initialState.core, __WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* getStorage */]('core'));

console.log(initialState);

var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["d" /* createStore */])(reducers, initialState, Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* applyMiddleware */])(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__services_core_middleware__["default"]));

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ "./src/js/services/core/middleware.js":
/*!********************************************!*\
  !*** ./src/js/services/core/middleware.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (151:28)\n\n\u001b[0m \u001b[90m 149 | \u001b[39m\t\t\t\t\t\t\t\u001b[32m'TSP: '\u001b[39m \u001b[33m+\u001b[39m getSecondsString(res\u001b[33m.\u001b[39mdata[\u001b[32m\"duration:compute\"\u001b[39m]) \u001b[33m+\u001b[39m \u001b[32m'</br>'\u001b[39m \u001b[33m+\u001b[39m\n \u001b[90m 150 | \u001b[39m                            \u001b[32m'Costs: '\u001b[39m \u001b[33m+\u001b[39m res\u001b[33m.\u001b[39mdata\u001b[33m.\u001b[39mcosts \u001b[33m+\u001b[39m\u001b[32m'</br>'\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 151 | \u001b[39m                            \u001b[32m'Costs: '\u001b[39m \u001b[33m+\u001b[39m res\u001b[33m.\u001b[39mdata\u001b[33m.\u001b[39mcosts\n \u001b[90m     | \u001b[39m                            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 152 | \u001b[39m\t\t\t\t\t}))\u001b[33m;\u001b[39m\n \u001b[90m 153 | \u001b[39m\t\t\t\t\taction \u001b[33m=\u001b[39m processResult(res\u001b[33m,\u001b[39m action\u001b[33m,\u001b[39m store)\u001b[33m;\u001b[39m\n \u001b[90m 154 | \u001b[39m\t\t\t\t\tnext(action)\u001b[0m\n");

/***/ })

})
//# sourceMappingURL=0.25c742250ffac6c43710.hot-update.js.map