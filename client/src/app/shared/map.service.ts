import * as L from 'leaflet'
export class MapService{
    private Layer=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });


    private lineStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
    };

    getLayer(){
        return this.Layer
    }

    getLineStyle(){
        return this.lineStyle
    }
}
