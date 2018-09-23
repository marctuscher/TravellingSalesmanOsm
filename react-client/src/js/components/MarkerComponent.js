
import React, {createRef} from 'react';
import * as coreActions from '../services/core/actions';
import '../../css/components/MarkerComponent.css'
import {Marker, Popup} from 'react-leaflet'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
class MarkerComponent extends React.PureComponent {

    constructor(props){
        super(props);
        this.deleteMarker = this.deleteMarker.bind(this);
    }

    deleteMarker(){
        this.props.coreActions.deleteMarker(this.props.index);
    }
    renderPopup(){
        return (
            <div>
                <Popup
                >
                <button>Set as Target for Routing</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);