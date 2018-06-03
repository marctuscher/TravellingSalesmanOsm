import {HttpClient} from "@angular/common/http";
import {Location} from "../objects/location.class";
import {Injectable} from "@angular/core";
import * as L from 'leaflet'

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class DataService{

    constructor(private http: HttpClient){
    }


    private data=[
        {
        "type": "LineString",
        "coordinates":[]
    }];

    private StartLocation = new Location();
    private TargetLocation = new Location();

    setCoordinates(_coordinates){
        this.data[0]['coordinates'] = _coordinates
    };

    getData(){
        return this.data;
    }

    setStartLocation(start:Location){
        this.StartLocation = start;
    }

    setTargetLocation(target:Location){
        this.TargetLocation = target;
    }

    getStartLocation(){
        return this.StartLocation;
    }

    getTargetLocation(){
        return this.TargetLocation;
    }

    geocode(address: string) : Location {
        var location = new Location()
        console.log("Uriadress:","https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address)+ "&key=AIzaSyAVeetKghyaGndVA3SZGkKNxcFSlZV2ZXw"+"&project=mooglegaps-194515")
        this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address)+ "&key=AIzaSyAVeetKghyaGndVA3SZGkKNxcFSlZV2ZXw"+"&project=mooglegaps-194515").subscribe((data:any)=>{
            if(data['status'] != 'OK') throw new Error('Unable to get Adress')
            location.address = data['results'][0].formatted_address
            location.latitude = data['results'][0].geometry.location.lat;
            location.longitude = data['results'][0].geometry.location.lng;
            return location
        })
        return location
    }

    geocodeLatlng(longitude:number, latitude:number){
        var location = new Location()
        this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + encodeURIComponent(longitude.toString()) + ","+ encodeURIComponent(latitude.toString()) + "&key=AIzaSyAVeetKghyaGndVA3SZGkKNxcFSlZV2ZXw"+"&project=mooglegaps-194515").subscribe((data:any)=>{
            if(data['status'] != 'OK') throw new Error('Unable to get Adress')
            location.address = data['results'][0].formatted_address
            location.latitude = data['results'][0].geometry.location.lat;
            location.longitude = data['results'][0].geometry.location.lng;
            return location
        })
        return location
    }
}
