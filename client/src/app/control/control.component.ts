import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../shared/data.service';
import { MapService } from '../shared/map.service';
import { Location } from '../objects/location.class';
import { Route } from '../objects/route.class'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
    @Output() CalculateRoute: EventEmitter<Route> = new EventEmitter();

    location;
    StartLocation: Location;
    TargetLocation: Location;
    selectedRoute = "coordinate";

    constructor(private dataService : DataService, private mapService : MapService) {
        this.StartLocation=new Location();
        this.TargetLocation=new Location();
    }

    ngOnInit() {
    }

    startPoint(){
        if(!this.StartLocation.address){alert("please enter Start"); return;}
        this.StartLocation = this.dataService.geocode(this.StartLocation.address);
        // not a good idea because if asynch
        this.dataService.setStartLocation(this.StartLocation);
        this.dataService.setTargetLocation(this.TargetLocation);
    }

    targetPoint(){
        if(!this.TargetLocation.address){alert("Please enter Target"); return;}
        this.TargetLocation = this.dataService.geocode(this.TargetLocation.address)
        // not a good idea because of asynch
        this.dataService.setStartLocation(this.StartLocation);
        this.dataService.setTargetLocation(this.TargetLocation);
    }

    updateService(){
        this.dataService.setTargetLocation(this.TargetLocation)
        this.dataService.setStartLocation(this.StartLocation)
    }

    pointChanged(){
        this.selectedRoute="coordinate";
        this.StartLocation = this.dataService.getStartLocation();
        this.TargetLocation = this.dataService.getTargetLocation();
    }

    calculateRoute(){
        console.log("calculate from: ", this.StartLocation.address, "to", this.TargetLocation.address)
        if(this.StartLocation.latitude <0 && this.TargetLocation.latitude <0){
            alert('please enter Start and Target')
            return;
        }

            if (this.selectedRoute == "id") this.CalculateRoute.emit(Route.byID)
            if (this.selectedRoute == "coordinate") this.CalculateRoute.emit(Route.byCoordinate)
            if (this.selectedRoute == "place") this.CalculateRoute.emit(Route.byCoordinate)
    }
}
