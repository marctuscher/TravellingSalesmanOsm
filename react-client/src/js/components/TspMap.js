import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/TspMap.css'
import {Marker, Polyline} from 'react-leaflet'

class TspMap extends React.Component {

    render(){
        return (
            <div>
                {this.props.path ? <Polyline positions={this.props.path}/>: null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.core.tspPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TspMap);