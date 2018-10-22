import React, {createRef} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as coreActions from '../services/core/actions';
import {Map, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/components/TSPComponent.css'
import '../../css/components/MapView.css'


import RoutingMap from './RoutingMap'
import TspMap from './TspMap'
import MarkerComponent from './MarkerComponent'
import '../../css/components/SidebarContent.css'

// Making markers work without having to use the google CDN
// https://github.com/PaulLeCam/react-leaflet/issues/453
import L from 'leaflet';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';

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
			this.clearMarkers = this.clearMarkers.bind(this)
	}
	mapRef = createRef()

	handleMapClick = e => {
			this.props.coreActions.addMarker(e.latlng, "standard")
	}

	longitudes = [8, 9, 10, 11]
	latitudes = [38, 39 , 40, 41]
		


	renderClickMarkers(){
		return this.props.markers.map((marker, i) => {
				return (
				<MarkerComponent
				key={i} 
				coord={marker.latlng} 
				type={marker.type}
				marker={marker}
				index={i}/>
				)
		})
	}

	clearMarkers(){
		this.props.coreActions.clearMarkers();
	}

	renderMap(){
		if (this.props.appState === "tsp"){
			return (
				<TspMap/>
			)
		}else if (this.props.appState === "routing"){
			return (
				<RoutingMap/>
			)
		}
	}


	

	render() {
		var position = [this.props.position.latitude, this.props.position.longitude];
		var style = {
			stroke: 'green',
			"stroke-dasharray": "10,10"
		}
		return ( 
			<Map className="map-view" 
				center={position}
				zoom={this.props.zoom}
				onClick={this.handleMapClick}
				ref={this.mapRef} 
				zoomControl={false}
			>
			<div className="box">
			  <button className="btn-clear" onClick={this.clearMarkers}>ClearMarkers</button>
			</div>
			{this.renderClickMarkers()}
				<TileLayer
			  	attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			  	url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				 {this.renderMap()}
{/*  				 <polyline positions={[{lat:40, lng: 5},{lat:60, lng: 5}]}></polyline>
				 <polyline positions={[{lat:40, lng: 6},{lat:60, lng: 6}]}></polyline>
				 <polyline positions={[{lat:40, lng: 7},{lat:60, lng: 7}]}></polyline>
				 <polyline positions={[{lat:40, lng: 8},{lat:60, lng: 8}]}></polyline>
				 <polyline positions={[{lat:40, lng: 9},{lat:60, lng: 9}]}></polyline>
				 <polyline positions={[{lat:40, lng: 10},{lat:60, lng: 10}]}></polyline>
				 <polyline positions={[{lat:40, lng: 11},{lat:60, lng: 11}]}></polyline>
				 <polyline positions={[{lat:40, lng: 12},{lat:60, lng: 12}]}></polyline>
				 <polyline positions={[{lat:40, lng: 13},{lat:60, lng: 13}]}></polyline>
				 <polyline positions={[{lat:40, lng: 14},{lat:60, lng: 14}]}></polyline>
				 <polyline positions={[{lat:40, lng: 15},{lat:60, lng: 15}]}></polyline>


				 <polyline positions={[{lat:45, lng: 0},{lat:45, lng: 20}]}></polyline>
				 <polyline positions={[{lat:46, lng: 0},{lat:46, lng: 20}]}></polyline>
				 <polyline positions={[{lat:47, lng: 0},{lat:47, lng: 20}]}></polyline>
				 <polyline positions={[{lat:48, lng: 0},{lat:48, lng: 20}]}></polyline>
				 <polyline positions={[{lat:49, lng: 0},{lat:49, lng: 20}]}></polyline>
				 <polyline positions={[{lat:50, lng: 0},{lat:50, lng: 20}]}></polyline>
				 <polyline positions={[{lat:51, lng: 0},{lat:51, lng: 20}]}></polyline>
				 <polyline positions={[{lat:52, lng: 0},{lat:52, lng: 20}]}></polyline> */}
		  </Map>
		)
	}
}

const mapStateToProps = (state) => {
    return {
		appState: state.core.appState,
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