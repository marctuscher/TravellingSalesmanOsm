import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/RoutingComponent.css'


class RoutingComponent extends React.Component {

    constructor(props){
        super(props)
        this.calcRoute = this.calcRoute.bind(this);
        this.setCategorySource = this.setCategorySource.bind(this);
        this.setCategoryTarget = this.setCategoryTarget.bind(this);
        this.changeCategorySource = this.changeCategorySource.bind(this);
        this.changeCategoryTarget = this.changeCategoryTarget.bind(this);
    }

    setCategorySource(){
        this.props.coreActions.setCategoryRoutingSource();
    }
    setCategoryTarget(){
        this.props.coreActions.setCategoryRoutingSource();
    }

    changeCategorySource(e){

    }

    changeCategoryTarget(e){

    }

    renderAddButton(name, setFunction){
        return (
            <div>
                <button onClick={setFunction}>Add category {name}</button>
            </div>
        )
    }

    renderSource(){
        if (this.props.source.type === "category"){
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
    }

    calcRoute(){
        this.props.coreActions.calcRoute(this.props.source, this.props.target)
    }

    renderTarget(){
        return (
            <div>
                <h4>Target</h4>
                <form>
                    <label>lat:</label>
                    {this.props.target.lat}
                </form>
                <form>
                    <label>lon:</label>
                    {this.props.target.lng}
                </form>
            </div>
        )
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