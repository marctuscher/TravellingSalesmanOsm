import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingComponent.css'


class RoutingComponent extends React.Component {

    render(){
        return (
            <div>{this.props.source ? this.props.source.latlng.lat: null}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.core.markers.filter((elem, id)=> {
            elem.dijkstra_source
        })[0],
        target: state.core.markers.filter((elem, id)=> {
            elem.dijkstra_target
        })[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingComponent);