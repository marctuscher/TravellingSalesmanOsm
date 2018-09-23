import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import '../../css/components/SidebarContent.css'

import Tab from './Tab'
import RoutingComponent from './RoutingComponent'
import TSPComponent from './TSPComponent'

class SidebarContent extends React.Component {
    constructor(props){
        super(props);
        this.setTSP = this.setTSP.bind(this)
        this.unsetTSP = this.unsetTSP.bind(this)
    }

    setTSP(){
        this.props.coreActions.setTsp(true);
    }
    unsetTSP(){
        this.props.coreActions.setTsp(false);
    }

    render(){
        return (
            <div className="sidebar-container">
                <Tab name="TSP" active={this.props.tsp} onClick={this.setTSP}/>
                <Tab name="Routing" active={!this.props.tsp} onClick={this.unsetTSP}/>
                { this.props.tsp ? <TSPComponent/>: <RoutingComponent/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);