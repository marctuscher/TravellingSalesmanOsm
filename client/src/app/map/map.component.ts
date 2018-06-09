import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MapService } from '../services/map.service';
import { Subscription } from 'rxjs';
import OlMap from 'ol/map';
import OlOSM from 'ol/source/osm';
import OlTileLayer from 'ol/layer/tile';
import OlVectorLayer from 'ol/layer/vector';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import Point from 'ol/geom/point';
import Feature from 'ol/feature';
import Vector from 'ol/source/vector';
import LineString from 'ol/geom/linestring';
import Style from 'ol/style/style';
import proj from 'ol/proj';

import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import * as L from 'leaflet';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    map: OlMap;
    source: OlOSM;
    layer: OlTileLayer;
    view: OlView;
    vectorLineLayer;
    vectorSource;
    srcNode;
    trgNode;


    constructor(private dataService: DataService, private _mapService: MapService) {

    }
    ngOnInit() {
        this.source = new OlOSM({
            crossOrigin: null
        });
        this.layer = new OlTileLayer({
            source: this.source
        });
        this.view = new OlView({
            center: OlProj.fromLonLat([10.447, 51.165]),
            zoom: 8
        });
        this.vectorSource = new Vector({});
        this.vectorLineLayer = new OlVectorLayer({
            source: this.vectorSource,
            style: new Style({
                fill: new Fill({
                    color: 'red',
                    width: 1.2
                }),
                stroke: new Stroke({
                    color: 'red',
                    width: 3
                })
            })
        });
        this.map = new OlMap({
            target: 'map',
            layers: [this.layer, this.vectorLineLayer],
            view: this.view
        });


    }
    onClick() {
        this.dataService.routeByNodeId(this.srcNode, this.trgNode, (res) => {
            this.vectorSource.clear();
            console.log("test");
            var points = []
            for (var elem of res.path) {
                points.push(OlProj.fromLonLat([Number(elem.lon), Number(elem.lat)]));
            }
            var lineString = new LineString(points);
            var featureLine = new Feature({
                geometry: lineString
            });
            console.log(featureLine);
            this.vectorSource.addFeatures([featureLine]);
        });
    }


}
