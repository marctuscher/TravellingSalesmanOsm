import {LatLngBounds} from "leaflet";

export class Location {
    latitude: number;
    longitude: number;
    address: string;
    viewBounds: LatLngBounds;
    nodeid:number;
}
