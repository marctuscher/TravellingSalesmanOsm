import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import {Subscription } from 'rxjs';
import OlMap from 'ol/map';
import OlOSM from 'ol/source/osm';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';

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
  srcNode;
  trgNode;


    constructor(private http:HttpClient, private dataService: DataService){

    }

    ngOnInit(){
        this.source = new OlOSM({
            crossOrigin: null
        });
        this.layer = new OlTileLayer({
            source: this.source
        });
        this.view = new OlView({
            center: OlProj.fromLonLat([6.661594, 50.433237]),
            zoom: 3,
        });
        this.map = new OlMap({
            target: 'map',
            layers: [this.layer],
            view: this.view
        });
    }
    onClick(){
        this.dataService.routeByNodeId(this.srcNode, this.trgNode);
    }


}
