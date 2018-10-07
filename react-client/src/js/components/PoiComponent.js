import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/PoiComponent.css'
import SourceTargetComponent from './SourceTargetComponent';
import AddButtons from './AddButtons'
import '../../css/components/SidebarContent.css'
import '../../css/components/AddButtons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import {faBars, faLocationArrow} from '@fortawesome/free-solid-svg-icons'

class PoiComponent extends React.Component {

    constructor(props){
        super(props);
        this.addCategoryTarget = this.addCategoryTarget.bind(this);
        this.calc = this.calc.bind(this);
        
    }

    calc(){
        this.props.coreActions.calcPoi(this.props.targets);
    }

    addCategoryTarget(){
        this.props.coreActions.addCategoryPoiTarget()
    }

    changeCategoryTarget(e, index){
        this.props.coreActions.changeCategoryPoiTarget(e, index);
    }
    deleteTarget(index){
        this.props.coreActions.deletePoiTarget(index);
    }
    changeNumberOfElem(value, index){
        this.props.coreActions.changeNumberOfElemPoi(value, index);
    }

    renderAddTarget(){
        return (
            <div className="containerbox">
             <button className="btn-addbox" style={{width: "100%"}} onClick={this.addCategoryTarget} ><FontAwesomeIcon icon={faBars}/> Category</button>
            </div>
        )
    }
    renderTarget(){
        return this.props.targets.map((elem, index) => {
            return (
                <SourceTargetComponent 
                key={index} 
                type={"target"} 
                elem={elem} 
                delete={()=> this.deleteTarget(index)} 
                changeCategory={(e)=> this.changeCategoryTarget(e, index)}
                changeNumber={true}
                poi={true}
                index={index}
                />
            )
        })
    }
    
    render(){
        return (
            <div>
                {this.props.targets ? this.renderTarget(): null}
                {this.renderAddTarget()}
                <div class="containerbox">
                    <button class="btn-calc" style={{width: "100%"}} onClick={this.calc}>Calc</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        targets: state.core.poiTargets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoiComponent);