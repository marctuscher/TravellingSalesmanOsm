import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingComponent.css'


class RoutingComponent extends React.Component {

    render(){
        return (
            <div>My Routing COmpoentn</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutingComponent);