import React from 'react';

import Map from 'ol/Map'
import OlOSM from 'ol/source/OSM'
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import {
	fromLonLat
} from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Vector from 'ol/source/Vector';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';

import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export default class MapView extends React.Component {
	constructor(props) {
		super(props)
		this.source = new OlOSM({
			crossOrigin: null
		});
		this.layer = new OlTileLayer({
			source: this.source
		});
		this.view = new OlView({
			center: fromLonLat([10.447, 51.165]),
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

    }
    componentDidMount(props){
		this.map = new Map({
			target: 'map',
			layers: [this.layer, this.vectorLineLayer],
			view: this.view
		});
    }

	render() {
		return ( 
        <div>
            <div id="map" style={{width: '100%',
                height:'100vh'}}></div>
    
        </div>
		)
	}
}
