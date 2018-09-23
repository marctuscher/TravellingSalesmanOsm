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
        this.state = {
            tsp: true
        }
        this.setTSP = this.setTSP.bind(this)
        this.unsetTSP = this.unsetTSP.bind(this)
    }

    setTSP(){
        this.setState({tsp: true})
    }
    unsetTSP(){
        this.setState({tsp: false})
    }

    render(){
        return (
            <div>
                <Tab name="TSP" active={this.state.tsp} onClick={this.setTSP}/>
                <Tab name="Routing" active={!this.state.tsp} onClick={this.unsetTSP}/>
                {this.state.tsp ? <TSPComponent/>: <RoutingComponent/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);