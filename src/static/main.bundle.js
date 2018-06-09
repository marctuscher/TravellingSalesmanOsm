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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
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
        core_1.ViewChild('MapComponent'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "map", void 0);
    __decorate([
        core_1.ViewChild('ControlComponent'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "control", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var http_2 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var map_component_1 = __webpack_require__("./src/app/map/map.component.ts");
// Services
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var map_service_1 = __webpack_require__("./src/app/services/map.service.ts");
var angular2_busy_1 = __webpack_require__("./node_modules/angular2-busy/index.js");
var animations_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                map_component_1.MapComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                angular2_busy_1.BusyModule
            ],
            providers: [
                data_service_1.DataService,
                map_service_1.MapService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/services/data.service.ts");
var map_service_1 = __webpack_require__("./src/app/services/map.service.ts");
var map_1 = __webpack_require__("./node_modules/ol/map.js");
var osm_1 = __webpack_require__("./node_modules/ol/source/osm.js");
var tile_1 = __webpack_require__("./node_modules/ol/layer/tile.js");
var vector_1 = __webpack_require__("./node_modules/ol/layer/vector.js");
var view_1 = __webpack_require__("./node_modules/ol/view.js");
var proj_1 = __webpack_require__("./node_modules/ol/proj.js");
var feature_1 = __webpack_require__("./node_modules/ol/feature.js");
var vector_2 = __webpack_require__("./node_modules/ol/source/vector.js");
var linestring_1 = __webpack_require__("./node_modules/ol/geom/linestring.js");
var style_1 = __webpack_require__("./node_modules/ol/style/style.js");
var fill_1 = __webpack_require__("./node_modules/ol/style/fill.js");
var stroke_1 = __webpack_require__("./node_modules/ol/style/stroke.js");
var MapComponent = /** @class */ (function () {
    function MapComponent(dataService, _mapService) {
        this.dataService = dataService;
        this._mapService = _mapService;
    }
    MapComponent.prototype.ngOnInit = function () {
        this.source = new osm_1.default({
            crossOrigin: null
        });
        this.layer = new tile_1.default({
            source: this.source
        });
        this.view = new view_1.default({
            center: proj_1.default.fromLonLat([10.447, 51.165]),
            zoom: 8
        });
        this.vectorSource = new vector_2.default({});
        this.vectorLineLayer = new vector_1.default({
            source: this.vectorSource,
            style: new style_1.default({
                fill: new fill_1.default({
                    color: 'red',
                    width: 1.2
                }),
                stroke: new stroke_1.default({
                    color: 'red',
                    width: 3
                })
            })
        });
        this.map = new map_1.default({
            target: 'map',
            layers: [this.layer, this.vectorLineLayer],
            view: this.view
        });
    };
    MapComponent.prototype.onClick = function () {
        var _this = this;
        this.dataService.routeByNodeId(this.srcNode, this.trgNode, function (res) {
            _this.vectorSource.clear();
            console.log("test");
            var points = [];
            for (var _i = 0, _a = res.path; _i < _a.length; _i++) {
                var elem = _a[_i];
                points.push(proj_1.default.fromLonLat([Number(elem.lon), Number(elem.lat)]));
            }
            var lineString = new linestring_1.default(points);
            var featureLine = new feature_1.default({
                geometry: lineString
            });
            console.log(featureLine);
            _this.vectorSource.addFeatures([featureLine]);
        });
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'app-map',
            template: __webpack_require__("./src/app/map/map.component.html"),
            styles: [__webpack_require__("./src/app/map/map.component.css")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, map_service_1.MapService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;


/***/ }),

/***/ "./src/app/services/data.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;


/***/ }),

/***/ "./src/app/services/map.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var L = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
var MapService = /** @class */ (function () {
    function MapService() {
        this.Layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map