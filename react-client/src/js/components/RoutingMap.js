import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingMap.css'
import {Marker} from 'react-leaflet'

class RoutingMap extends React.Component {


    getPositionArray(node){
        return [node.latitude, node.longitude]
    }

    render(){
        return (
            <div>
			    {this.props.source ? <Marker position={this.getPositionArray(this.props.source)}/> : null }
			    {this.props.target ? <Marker position={this.getPositionArray(this.props.source)}/> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.core.routingSource,
        target: state.core.routingTarget
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingMap);