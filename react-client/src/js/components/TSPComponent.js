import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/TSPComponent.css'


class TSPComponent extends React.Component {


    constructor(props){
        super(props)
        this.heldKarp = this.heldKarp.bind(this)
    }
    
    heldKarp(){
        this.props.coreActions.tsp_held_karp(this.props.source, this.props.targets);
    }

    renderSource(){
        return (
            <div>
                <h4>Source</h4>
                <form>
                    <label>lat:</label>
                    {this.props.source.lat}
                </form>
                <form>
                    <label>lon:</label>
                    {this.props.source.lng}
                </form>
            </div>
        )
    }

    calcRoute(){
        this.props.coreActions.calcRoute(this.props.source, this.props.target)
    }

    renderTarget(){
        return this.props.targets.map(elem => {
        return (
            <div>
                <h4>Target</h4>
                <form>
                    <label>lat:</label>
                    {elem.lat}
                </form>
                <form>
                    <label>lon:</label>
                    {elem.lng}
                </form>
            </div>
        )
        })
    }

    render(){
        return (
            <div>
            {this.props.source ? this.renderSource(): null}
            {this.props.targets ? this.renderTarget(): null}
            <button onClick={this.heldKarp}>Calc</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.core.tspSource,
        targets: state.core.tspTargets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TSPComponent);