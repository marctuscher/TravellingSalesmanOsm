import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as coreActions from '../services/core/actions';

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
import { Projection } from 'ol/proj';

class MapView extends React.Component {
	constructor(props) {
		super(props)
		this.source = new OlOSM({
			crossOrigin: null
		});
		this.layer = new OlTileLayer({
			source: this.source
		});
		this.posCoords = {}
		this.view = new OlView({
			center: fromLonLat([10.447, 51.165]),
			zoom: 8
		});
		this.vectorSource = new Vector({
			features: []		
		});
		navigator.geolocation.getCurrentPosition(position => {
			this.posCoords = position.coords;
			this.positionFeature = new Feature({
				style: new Style({
					stroke: 3,
					color: 'blue'
				})
			});
			this.props.coreActions.set_current_geolocation(position);
			this.positionFeature.setGeometry(new Point(fromLonLat([this.posCoords.longitude, this.posCoords.latitude])));
			this.view.setCenter(fromLonLat([this.posCoords.longitude, this.posCoords.latitude]));
			this.vectorSource.addFeature(this.positionFeature);
		});
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

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		if (this.props.path !== nextProps.path){
			var points = [];
			for (var elem of nextProps.path){
				points.push(fromLonLat([Number(elem.lon), Number(elem.lat)]))
			}
			var lineString = new LineString(points);
			var featureLine = new Feature({
				geometry: lineString
			});
			console.log(lineString);
			this.vectorSource.addFeatures([featureLine]);
		}
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

const mapStateToProps = (state) => {
    return {
		path: state.core.path
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);