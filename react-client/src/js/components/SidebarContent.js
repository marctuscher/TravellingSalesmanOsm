import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import '../../css/components/SidebarContent.css'

import Tab from './Tab'
import RoutingComponent from './RoutingComponent'
import TSPComponent from './TSPComponent'
import PoiComponent from './PoiComponent'

class SidebarContent extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(props){
        this.props.coreActions.getCategories();
    }

    setAppState(appState){
        this.props.coreActions.setAppState(appState);
    }

    renderApp(){
        if (this.props.appState === "tsp"){
            return (
                <TSPComponent/>
            )
        }else if (this.props.appState ==="routing"){
            return (
                <RoutingComponent/>
            )
        }else if (this.props.appState === "poi"){
            return (
                <PoiComponent/>
            )
        }
    }

    render(){
        return (
            <div className="sidebar">
                <div className="containerbox">
                <Tab name="TSP" active={this.props.appState === "tsp"} onClick={()=> this.setAppState("tsp")}/>
                <Tab name="Routing" active={this.props.appState === "routing"} onClick={()=> this.setAppState("routing")}/>
                <Tab name="POI" active={this.props.appState === "poi"} onClick={()=> this.setAppState("poi")}/>
                </div>
                {this.renderApp()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);