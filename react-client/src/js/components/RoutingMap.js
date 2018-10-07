import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingMap.css'
import {Polyline} from 'react-leaflet'

class RoutingMap extends React.Component {




    render(){
        return (
            <div>
                {this.props.path ? <Polyline ref={line => {this.line = line}} positions={this.props.path} />: null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.core.routePath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingMap);