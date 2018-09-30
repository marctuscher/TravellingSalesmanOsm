
import React, {createRef} from 'react';
import * as coreActions from '../services/core/actions';
import '../../css/components/MarkerComponent.css'
import {Marker, Popup} from 'react-leaflet'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
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
        if (this.props.tsp){
            this.props.coreActions.addTspMarkerTarget(this.props.index);
        }else {
            this.props.coreActions.setRoutingTargetMarker(this.props.index)
        }
    }
    setSource(){
        if (this.props.tsp){
            this.props.coreActions.setTspSource(this.props.index);
        }else {
            this.props.coreActions.setRoutingSourceMarker(this.props.index);
        }
    }



    renderPopup(){
        return (
            <div>
                <Popup>
                <button onClick={this.setSource}>Set source</button>
                <button onClick={this.setTarget}>Set target</button>
                <button onClick={this.deleteMarker}>deleteMarker</button>
                {this.props.markerText}
                </Popup>
            </div>
        )
    }

    render(){
        return (
        <div>
            <Marker position={this.props.coord}>
                {this.renderPopup()}
            </Marker>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tsp: state.core.tsp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);