import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingComponent.css'
import CategoryComponent from './CategoryComponent';
import SourceTargetComponent from './SourceTargetComponent'
import AddButtons from './AddButtons';
import '../../css/components/SidebarContent.css'


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
        this.setCurrentSource = this.setCurrentSource.bind(this);
        this.setCurrentTarget = this.setCurrentTarget.bind(this);
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

    renderAddButtons(name, setFunctionCategory, setFunctionLocation){
        return (
            <AddButtons addCategory={setFunctionCategory} addCurrent={setFunctionLocation}/>
        )
    }

    calcRoute(){
        this.props.coreActions.calcRoute(this.props.source, this.props.target)
    }

    renderSource(){
        return (<SourceTargetComponent type={"source"} elem={this.props.source} delete={this.deleteSource} changeCategory={this.changeCategorySource}/>)
    }

    renderTarget(){
        return (
            <SourceTargetComponent type={"target"} elem={this.props.target} delete={this.deleteTarget} changeCategory={this.changeCategoryTarget}/>
        )

    }

    render(){
        return (
            <div>
            {this.props.source ? this.renderSource(): this.renderAddButtons("source", this.setCategorySource, this.setCurrentSource)}
            {this.props.target ? this.renderTarget(): this.renderAddButtons("target", this.setCategoryTarget, this.setCurrentTarget)}
            <div className="containerbox">
             <button className="btn-calc" style={{width: "100%"}} onClick={this.calcRoute}>Calc</button>
            </div>
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