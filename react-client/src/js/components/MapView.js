import React, {createRef} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as coreActions from '../services/core/actions';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/components/MapView.css'

import RoutingMap from './RoutingMap'
import TspMap from './TspMap'
import MarkerComponent from './MarkerComponent'

// Making markers work without having to use the google CDN
// https://github.com/PaulLeCam/react-leaflet/issues/453
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapView extends React.Component {
	constructor(props) {
		super(props)
			this.props.coreActions.get_current_geolocation();
	}
	mapRef = createRef()

	handleMapClick = e => {
			this.props.coreActions.addMarker(e.latlng, "standard")
	}
		

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		if (this.props.path !== nextProps.path){
		}
	}

	renderClickMarkers(){
		return this.props.markers.map((marker, i) => {
				return (
				<MarkerComponent
				key={i} 
				coord={marker.latlng} 
				type={marker.type}
				index={i}/>
				)
		})
	}

	

	render() {
		var position = [this.props.position.latitude, this.props.position.longitude];
		return ( 
			<Map 
				center={position}
				zoom={this.props.zoom}
				onClick={this.handleMapClick}
				ref={this.mapRef} 
			>
			{this.renderClickMarkers()}
				<TileLayer
			  	attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			  	url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
			{this.props.tsp? <TspMap/>: <RoutingMap/>}
		  </Map>
		)
	}
}

const mapStateToProps = (state) => {
    return {
		tsp: state.core.tsp,
		position: state.core.position,
		path: state.core.path,
		zoom: state.core.zoom, 
		markers: state.core.markers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);