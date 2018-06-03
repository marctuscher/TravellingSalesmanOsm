import { Component, Directive, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
    @ViewChild('MapComponent') map
    @ViewChild('ControlComponent') control

    calculateRoute(data){
        this.map.calculateRoute(data);
    }

    pointChanged(){
        this.control.pointChanged();
    }
}
