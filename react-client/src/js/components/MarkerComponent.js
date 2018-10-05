
import React, {createRef} from 'react';
import * as coreActions from '../services/core/actions';
import '../../css/components/MarkerComponent.css'
import {Marker, Popup} from 'react-leaflet'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
class MarkerComponent extends React.Component {

    constructor(props){
        super(props);
        this.deleteMarker = this.deleteMarker.bind(this);
        this.setTarget = this.setTarget.bind(this);
        this.setSource = this.setSource.bind(this);
    }

    deleteMarker(){
        this.props.coreActions.deleteMarker(this.props.index);
    }

    setTarget(){
        if (this.props.appState === "tsp"){
            this.props.coreActions.addTspMarkerTarget(this.props.index);
        }else if (this.props.appState === "routing") {
            this.props.coreActions.setRoutingTargetMarker(this.props.index)
        }
    }
    setSource(){
        if (this.props.appState === "tsp"){
            this.props.coreActions.setTspMarkerSource(this.props.index);
        }else if (this.props.appState === "routing"){
            this.props.coreActions.setRoutingSourceMarker(this.props.index);
        }
    }



    renderPopup(){
        return (
                <Popup>
                    <div className="delete-marker-btn" onClick={this.deleteMarker}><FontAwesomeIcon color="#44bd32" icon={faMinusSquare}></FontAwesomeIcon></div>
                    <div className="popup">
                    <h4>{this.props.marker.tags ? this.props.marker.tags.name: null}</h4>
                    {this.props.marker.tags.opening_hours ?<p className="opening"><strong>Open:</strong> {this.props.marker.tags.opening_hours}</p>: null}
                    <p>{this.props.marker.text}</p> 
                    <div className="btn-box">
                    <button className="btn-set-marker" onClick={this.setSource}>Set source</button>
                    <button className="btn-set-marker" onClick={this.setTarget}>Set target</button>
                    </div>
                    </div>
                </Popup>
        )
    }

    render(){
        return (
        <div>
            <Marker position={this.props.coord} color="#44bd32">
                {this.renderPopup()}
            </Marker>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        appState: state.core.appState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);