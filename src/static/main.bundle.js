webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "            <app-map #MapComponent (PointChanged) =\"pointChanged()\"></app-map>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent.prototype.calculateRoute = function (data) {
        this.map.calculateRoute(data);
    };
    AppComponent.prototype.pointChanged = function () {
        this.control.pointChanged();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('MapComponent'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "map", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ControlComponent'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "control", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_map_component__ = __webpack_require__("./src/app/map/map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_map_service__ = __webpack_require__("./src/app/services/map.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_busy__ = __webpack_require__("./node_modules/angular2-busy/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_busy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_angular2_busy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Services




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__map_map_component__["a" /* MapComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9_angular2_busy__["BusyModule"]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__services_data_service__["a" /* DataService */],
                __WEBPACK_IMPORTED_MODULE_8__services_map_service__["a" /* MapService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/map/map.component.css":
/***/ (function(module, exports) {

module.exports = ".map{\n    width: 100%;\n    height:100vh;\n}"

/***/ }),

/***/ "./src/app/map/map.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"container-fluid\">\n    <div class=\"row\" style=\"height:auto\">\n<div class=\"col-md-2\">\n<nav class=\"navbar navbar-light\" style=\"background-color: #e3f2fd;\">\n    <a class=\"navbar-brand\">Fapra</a>\n        <form >\n          <input [(ngModel)]=\"srcNode\" class=\"form-control\" type=\"text\"\n                 placeholder=\"Enter startnode\" name=\"StartNode\">\n          <input [(ngModel)]=\"trgNode\"class=\"form-control\" type=\"text\"\n                 placeholder=\"Enter targetnode\" name=\"TargetNode\">\n        </form>\n\n        <button class=\"btn btn-success\" (click)=\"onClick()\">Search</button>\n</nav>\n</div>\n<div class=\"col\">\n    <div class=\"map\" id=\"map\"></div>\n</div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/map/map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_map_service__ = __webpack_require__("./src/app/services/map.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ol_map__ = __webpack_require__("./node_modules/ol/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ol_source_osm__ = __webpack_require__("./node_modules/ol/source/osm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ol_layer_tile__ = __webpack_require__("./node_modules/ol/layer/tile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ol_layer_vector__ = __webpack_require__("./node_modules/ol/layer/vector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ol_view__ = __webpack_require__("./node_modules/ol/view.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ol_proj__ = __webpack_require__("./node_modules/ol/proj.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ol_feature__ = __webpack_require__("./node_modules/ol/feature.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ol_source_vector__ = __webpack_require__("./node_modules/ol/source/vector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ol_geom_linestring__ = __webpack_require__("./node_modules/ol/geom/linestring.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ol_style_style__ = __webpack_require__("./node_modules/ol/style/style.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ol_style_fill__ = __webpack_require__("./node_modules/ol/style/fill.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ol_style_stroke__ = __webpack_require__("./node_modules/ol/style/stroke.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MapComponent = /** @class */ (function () {
    function MapComponent(dataService, _mapService) {
        this.dataService = dataService;
        this._mapService = _mapService;
    }
    MapComponent.prototype.ngOnInit = function () {
        this.source = new __WEBPACK_IMPORTED_MODULE_4_ol_source_osm__["a" /* default */]({
            crossOrigin: null
        });
        this.layer = new __WEBPACK_IMPORTED_MODULE_5_ol_layer_tile__["a" /* default */]({
            source: this.source
        });
        this.view = new __WEBPACK_IMPORTED_MODULE_7_ol_view__["a" /* default */]({
            center: __WEBPACK_IMPORTED_MODULE_8_ol_proj__["a" /* default */].fromLonLat([10.447, 51.165]),
            zoom: 8
        });
        this.vectorSource = new __WEBPACK_IMPORTED_MODULE_10_ol_source_vector__["a" /* default */]({});
        this.vectorLineLayer = new __WEBPACK_IMPORTED_MODULE_6_ol_layer_vector__["a" /* default */]({
            source: this.vectorSource,
            style: new __WEBPACK_IMPORTED_MODULE_12_ol_style_style__["a" /* default */]({
                fill: new __WEBPACK_IMPORTED_MODULE_13_ol_style_fill__["a" /* default */]({
                    color: 'red',
                    width: 1.2
                }),
                stroke: new __WEBPACK_IMPORTED_MODULE_14_ol_style_stroke__["a" /* default */]({
                    color: 'red',
                    width: 3
                })
            })
        });
        this.map = new __WEBPACK_IMPORTED_MODULE_3_ol_map__["a" /* default */]({
            target: 'map',
            layers: [this.layer, this.vectorLineLayer],
            view: this.view
        });
        // this.map = L.map('map').setView([51.163375,10.447683],5);
        // this.map.addLayer(this._mapService.getLayer())
    };
    MapComponent.prototype.onClick = function () {
        var _this = this;
        this.dataService.routeByNodeId(this.srcNode, this.trgNode, function (res) {
            console.log("test");
            var points = [];
            for (var _i = 0, _a = res.path; _i < _a.length; _i++) {
                var elem = _a[_i];
                points.push(__WEBPACK_IMPORTED_MODULE_8_ol_proj__["a" /* default */].fromLonLat([Number(elem.lon), Number(elem.lat)]));
            }
            var lineString = new __WEBPACK_IMPORTED_MODULE_11_ol_geom_linestring__["a" /* default */](points);
            var featureLine = new __WEBPACK_IMPORTED_MODULE_9_ol_feature__["a" /* default */]({
                geometry: lineString
            });
            console.log(featureLine);
            _this.vectorSource.addFeatures([featureLine]);
        });
    };
    MapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-map',
            template: __webpack_require__("./src/app/map/map.component.html"),
            styles: [__webpack_require__("./src/app/map/map.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__services_map_service__["a" /* MapService */]])
    ], MapComponent);
    return MapComponent;
}());



/***/ }),

/***/ "./src/app/services/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService(_http) {
        this._http = _http;
    }
    DataService.prototype.routeByNodeId = function (srcId, trgId, callback) {
        this._http.post('/routebynodeid', { "srcNode": srcId, "trgNode": trgId }, { responseType: 'json' }).subscribe(function (data) {
            callback(data);
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/services/map.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapService = /** @class */ (function () {
    function MapService() {
        this.Layer = __WEBPACK_IMPORTED_MODULE_1_leaflet__["tileLayer"]('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        this.lineStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };
    }
    MapService.prototype.getLayer = function () {
        return this.Layer;
    };
    MapService.prototype.getLineStyle = function () {
        return this.lineStyle;
    };
    MapService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MapService);
    return MapService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map