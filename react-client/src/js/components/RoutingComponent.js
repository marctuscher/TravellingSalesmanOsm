import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingComponent.css'
import CategoryComponent from './CategoryComponent';


class RoutingComponent extends React.Component {

    constructor(props){
        super(props)
        this.calcRoute = this.calcRoute.bind(this);
        this.setCategorySource = this.setCategorySource.bind(this);
        this.setCategoryTarget = this.setCategoryTarget.bind(this);
        this.changeCategorySource = this.changeCategorySource.bind(this);
        this.changeCategoryTarget = this.changeCategoryTarget.bind(this);
        this.deleteSource = this.deleteSource.bind(this);
        this.deleteTarget = this.deleteTarget.bind(this);
    }

    setCategorySource(){
        this.props.coreActions.setRoutingSourceCategory();
    }
    setCategoryTarget(){
        this.props.coreActions.setRoutingTargetCategory();
    }
    setCurrentSource(){
        this.props.coreActions.setRoutingSourceCurrent();
    }
    setCurrentTarget(){
        this.props.coreActions.setRoutingTargetCurrent();
    }

    changeCategorySource(e){
        this.props.coreActions.changeCategoryRoutingSource(e);
    }

    deleteSource(){
        this.props.coreActions.deleteRoutingSource();
    }

    deleteTarget(){
        this.props.coreActions.deleteRoutingTarget();
    }

    changeCategoryTarget(e){
        this.props.coreActions.changeCategoryRoutingTarget(e);
    }

    renderAddButton(name, setFunctionCategory, setFunctionLocation){
        return (
            <div>
                <button onClick={setFunctionCategory}>Add category {name}</button>
                <button onClick={setFunctionLocation}>Add current location {name}</button>
            </div>
        )
    }

    calcRoute(){
        this.props.coreActions.calcRoute(this.props.source, this.props.target)
    }

    renderSource(){
        if (this.props.source.mode === "category"){
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteSource}>Delete this source</button>
                    <CategoryComponent onChange={this.changeCategorySource}/>
                </div>
            )
        }else if (this.props.source.mode === "marker"){
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteSource}>Delete this source</button>
                    Marker Set!
                </div>
            )
        }
    }

    renderTarget(){
        if (this.props.target.mode === "category"){
            return (
                <div>
                    <h4>Target</h4><button onClick={this.deleteTarget}>Delete this target</button>
                    <CategoryComponent onChange={this.changeCategoryTarget}/>
                </div>
            )
        }else if (this.props.target.mode === "marker"){
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteTarget}>Delete this target</button>
                    Marker Set!
                </div>
            )
        }

    }

    render(){
        return (
            <div>
            {this.props.source ? this.renderSource(): this.renderAddButton("source", this.setCategorySource)}
            {this.props.target ? this.renderTarget(): this.renderAddButton("target", this.setCategoryTarget)}
            <button onClick={this.calcRoute}>Calc</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.core.dijkstraSource,
        target: state.core.dijkstraTarget
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutingComponent);