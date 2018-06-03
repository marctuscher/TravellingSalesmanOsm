import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../shared/data.service';
import { MapService } from '../shared/map.service';
import { Route } from '../objects/route.class';
import { Location} from '../objects/location.class'
import {Subscription } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    title = 'app';
    path=[];
    style={};
    map;
    mapHeight
    moogleGapsIcon;
    busy: Subscription;
    PathLayer;

    constructor(private http:HttpClient, private dataService: DataService, private mapService: MapService){
    }

    @Output() PointChanged: EventEmitter<any> = new EventEmitter();

    ngOnInit(){
        // Initialising map
        this.mapHeight=window.innerHeight-140;
        this.map = L.map('mapid').setView([51.163375,10.447683],5)
        this.map.addLayer(this.mapService.getLayer())
        this.map.on('click', (e:any)=>{
            this.chooseWayPoint(e);
        })
        var marker = L.marker([51.508, -0.11]).addTo(this.map)
    }

    chooseWayPoint(e:any){

        var choicePopUp = L.popup();
        var container = L.DomUtil.create('div'),
        startBtn = this.createButton('Start from this location', container),
        destBtn = this.createButton('Go to this location', container);

        choicePopUp
            .setLatLng(e.latlng)
            .setContent(container)
            .openOn(this.map);

        L.DomEvent.on(startBtn, 'click', ()=> {
            var location = new Location();
            location.longitude=e.latlng.lng;
            location.latitude=e.latlng.lat;
            this.dataService.setStartLocation(location);
            this.PointChanged.emit()
            console.log("start Location is: " , location)
        });

        L.DomEvent.on(destBtn, 'click', ()=>{
            var location = new Location()
            location.longitude=e.latlng.lng;
            location.latitude=e.latlng.lat;
            this.dataService.setTargetLocation(location);
            this.PointChanged.emit();
            console.log("target location is: ", location)
        });
    }

    createInfoLine(label:string, container:any){
        var div = L.DomUtil.create()
    }

    createButton(label: string, container: any) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    calculateRoute(data : Route){
        console.log(this.dataService.getStartLocation().address)
        console.log(this.dataService.getTargetLocation().address)
        console.log("check route: ", data, Route.byCoordinate)
        if(data == Route.byID) this.postbyID();
        if(data == Route.byCoordinate) this.postbyCoordinate();
    }

    onResize(event){
        //TODO handle dynamic height change
    }

    postbyID(){
        this.busy=this.http.post('/routebynodeid', {"srcNode": this.dataService.getStartLocation().nodeid,
                                                    "trgNode": this.dataService.getTargetLocation().nodeid},
                                 {responseType:'text'}).subscribe((data: any) => {
                                     this.drawPath(data)
                                 })
    }

    postbyCoordinate(){
        var req={"srcLongitude": this.dataService.getStartLocation().longitude,
                 "srcLatitude": this.dataService.getStartLocation().latitude,
                 "trgLongitude": this.dataService.getTargetLocation().longitude,
                 "trgLatitude": this.dataService.getTargetLocation().latitude}
        console.log(req)
        this.busy=this.http.post('/routebycoordinate', req,
                                 {responseType:'text'}).subscribe((data: any) => {
                                     var result = JSON.parse(data)
                                     console.log("error?", result['error'])
                                     if (result['error']== "false"){
                                         this.drawPath(data)
                                     }else{
                                         alert(result['errorMessage'])
                                     }
                                 })
    }

    drawPath(data:any){
        // Parse incoming string to Json
        var result=JSON.parse(data)
        console.log(result)
        var coordinates = result['nodes'];

        // convert coordinate strings to floats
        coordinates.forEach((item, index)=>{
            item[0]=parseFloat(item[0])
            item[1]=parseFloat(item[1])
        })


        // Safe coordinates in Data service
        this.dataService.setCoordinates(coordinates);

        // If route exist delete
        if(this.map.hasLayer(this.PathLayer)) this.map.removeLayer(this.PathLayer)
        // Initilize new geoJSON
        this.PathLayer=L.geoJSON(this.dataService.getData(), {
            style: this.mapService.getLineStyle()
        }).addTo(this.map)


        // Swap Long lat to lat long for Bounds
        // wired shit
        var swapedCoordinates=coordinates
        swapedCoordinates.forEach((item, index)=>{
            var tmp= item[0]
            item[0]=item[1]
            item[1]=tmp
        })
        // add all to map
        var myBounds = new L.LatLngBounds(swapedCoordinates);
        var bound = this.map.fitBounds(myBounds)
        this.map.setView(bound.getCenter())
    }
}
