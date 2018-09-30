import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/TSPComponent.css'
import CategoryComponent from './CategoryComponent';


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
    }
    
    heldKarp(){
        this.props.coreActions.tsp_held_karp(this.props.source, this.props.targets);
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
        if (this.props.source.mode === "category"){
            var defaultValue = this.props.source.group?this.props.source.group + ":" + this.props.source.category:null;
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteSource}>Delete this source</button>
                    <CategoryComponent onChange={this.changeCategorySource} defaultValue={defaultValue}/>
                </div>
            )
        }else if (this.props.source.mode === "marker"){
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteSource}>Delete this source</button>
                    Marker Set!
                </div>
            )
        }else if (this.props.source.mode === "current"){
            return (
                <div>
                    <h4>Source</h4><button onClick={this.deleteSource}>Delete this source</button>
                    Your current location is used!
                </div>
            )
        }
    }

    calcRoute(){
        this.props.coreActions.calcRoute(this.props.source, this.props.target)
    }

    renderTarget(){
        return this.props.targets.map((elem, index) => {
        if (elem.mode === "category"){
            var defaultValue = elem.group ? elem.group + ":" + elem.category: null;
            return (
                <div>
                    <h4>Target</h4><button onClick={()=> this.deleteTarget(index)}>Delete this target</button>
                    <CategoryComponent defaultValue={defaultValue} onChange={(e)=> this.changeCategoryTarget(e,index)}/>
                </div>
            )
        }else if (elem.mode === "marker"){
            return (
                <div>
                    <h4>Target</h4><button onClick={()=>this.deleteTarget(index)}>Delete this target</button>
                    Marker Set!
                </div>
            )
        }else if (elem.mode === "current"){
            return (
                <div>
                    <h4>Target</h4><button onClick={()=> this.deleteTarget(index)}>Delete this target</button>
                    Your current location is used!
                </div>
            )
        }
        })
    }

    render(){
        return (
            <div>
            {this.props.source ? this.renderSource(): this.renderAddSource()}
            {this.props.targets ? this.renderTarget(): null}
            {this.renderAddTarget()}
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