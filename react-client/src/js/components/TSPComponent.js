import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/TSPComponent.css'
import CategoryComponent from './CategoryComponent';
import SourceTargetComponent from './SourceTargetComponent';


class TSPComponent extends React.Component {


    constructor(props){
        super(props)
        this.heldKarp = this.heldKarp.bind(this)
        this.setCategorySource = this.setCategorySource.bind(this);
        this.setCurrentSource = this.setCurrentSource.bind(this);
        this.deleteSource = this.deleteSource.bind(this);
        this.changeCategorySource = this.changeCategorySource.bind(this)
        this.addCategoryTarget = this.addCategoryTarget.bind(this)
        this.addCurrentTarget = this.addCurrentTarget.bind(this)
        this.apx = this.apx.bind(this)
    }
    
    heldKarp(){
        this.props.coreActions.tsp_held_karp(this.props.source, this.props.targets);
    }
    apx(){
        this.props.coreActions.apx(this.props.source, this.props.targets);
    }

    setCategorySource(){
        this.props.coreActions.setTspSourceCategory();
    }
    setCurrentSource(){
        this.props.coreActions.setTspSourceCurrent();
    }
    deleteSource(){
        this.props.coreActions.deleteTspSource();
    }
    changeCategorySource(e){
        this.props.coreActions.changeCategoryTspSource(e);
    }
    addCategoryTarget(){
        this.props.coreActions.addCategoryTspTarget()
    }
    addCurrentTarget(){
        this.props.coreActions.addCurrentTspTarget()
    }
    changeCategoryTarget(e, index){
        this.props.coreActions.changeCategoryTspTarget(e, index);
    }
    deleteTarget(index){
        this.props.coreActions.deleteTspTarget(index);
    }

    renderAddSource(){
        return (
            <div>
                <button onClick={this.setCategorySource}>Category source</button>
                <button onClick={this.setCurrentSource}>Current location source</button>
            </div>
        )
    }

    renderAddTarget(){
        return (
            <div>
                <button onClick={this.addCategoryTarget}>Category target</button>
                <button onClick={this.addCurrentTarget}>Current location target</button>
            </div>
        )
    }

    renderSource(){
        return (<SourceTargetComponent type={"source"} elem={this.props.source} delete={this.deleteSource} changeCategory={this.changeCategorySource}/>)
    }


    renderTarget(){
        return this.props.targets.map((elem, index) => {
            return (
                <SourceTargetComponent key={index} type={"target"} elem={elem} delete={()=> this.deleteTarget(index)} changeCategory={(e)=> this.changeCategoryTarget(e, index)}/>
            )
        })
    }

    render(){
        return (
            <div>
            {this.props.source ? this.renderSource(): this.renderAddSource()}
            {this.props.targets ? this.renderTarget(): null}
            {this.renderAddTarget()}
            <button onClick={this.heldKarp}>Calc</button>
            <button onClick={this.apx}>Calc APX</button>
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