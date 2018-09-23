
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
        this.unsetTarget = this.unsetTarget.bind(this);
        this.unsetSource = this.unsetSource.bind(this);
        
    }

    deleteMarker(){
        this.props.coreActions.deleteMarker(this.props.index);
    }

    setTarget(){
        if (this.props.tsp){
            this.props.coreActions.setTspTarget(this.props.index);
        }else {
            this.props.coreActions.setDijkstraTarget(this.props.index);
        }
    }
    setSource(){
        if (this.props.tsp){
            this.props.coreActions.setTspSource(this.props.index);
        }else {
            this.props.coreActions.setDijkstraSource(this.props.index);
        }
    }

    unsetTarget(){
        if (this.props.tsp){
            this.props.coreActions.unsetTspTarget(this.props.index);
        }else{
            this.props.coreActions.unsetDijkstraTarget(this.props.index);
        }
    }

    unsetSource(){
        if (this.props.tsp){
            this.props.coreActions.unsetTspSource(this.props.index);
        }else{
            this.props.coreActions.unsetDijkstraSource(this.props.index);
        }
    }

    renderSourceTargetButton(){
        if (this.props.tsp){
            if (this.props.tspTarget){
                return (
                    <button onClick={this.unsetTarget}>Remove as target</button>
                )
            }else if(this.props.tspSource){
                return (
                    <button onClick={this.unsetSource}>Remove as source</button>
                )
            }else{
                return (
                    <div>
                    <button onClick={this.setTarget}>Add as target</button>
                    <button onClick={this.setSource}>Set as source</button>
                    </div>
                )
            }
        } else {
            if (this.props.dijkstraTarget){
                return (
                    <button onClick={this.unsetTarget}>Remove as target</button>
                )
            }else if(this.props.dijkstraSource){
                return (
                    <button onClick={this.unsetSource}>Remove as source</button>
                )
            }else{
                return (
                    <div>
                    <button onClick={this.setTarget}>Add as target</button>
                    <button onClick={this.setSource}>Set as source</button>
                    </div>
                )
            }
        }
    }

    renderPopup(){
        return (
            <div>
                <Popup>
                    {
                        this.renderSourceTargetButton()
                    }
                <button onClick={this.deleteMarker}>deleteMarker</button>
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