import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/SourceTargetComponent.css'
import CategoryComponent from './CategoryComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import '../../css/components/SidebarContent.css'





 class SourceTargetComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            numberOfElem: this.props.elem.numberOfElem
        }
    }

    changeNumberOfElem(value){
        if (value !== "")value = Number(value);
        this.setState({numberOfElem: value})
        if (this.props.poi){
            this.props.coreActions.changeNumberOfElemPoi(value, this.props.index);
        }else{
        this.props.coreActions.changeNumberOfElemTsp(value, this.props.index);
        }
    }


    renderOuterElem(){
        var name = this.props.type== "source"? "Source": "Target"
        return (
            <div className="containerbox">
            <div className="delete-btn" onClick={this.props.delete}><FontAwesomeIcon color="#44bd32" icon={faMinusSquare}></FontAwesomeIcon></div>
                <h6>{name}</h6>
                {this.renderInnerElem()}
            </div>
        )
    }


    renderInnerElem(){
        if (this.props.elem.mode === "category"){
            var defaultValue = this.props.elem.group?this.props.elem.group + ":" + this.props.elem.category:null;
            return (
                <div className="category-box">
                    <p>Choose a category</p>
                    <CategoryComponent className="category-pick" defaultValue={defaultValue} onChange={this.props.changeCategory}/>
                    {this.props.changeNumber ? <form>
                        <label>#POIs</label>
                        <input type="number" value={this.state.numberOfElem} onChange={(e) => this.changeNumberOfElem(e.target.value)}></input>
                    </form> : null}
                </div>
            )
        }else if (this.props.elem.mode === "marker"){
            return (
                <div>
                    Marker Set!
                </div>
            )
        }else if (this.props.elem.mode === "current"){
            return (
                <div>
                    Your current location is used!
                </div>
            )
        }
    }


    render(){
        return (
            <div>
                {this.renderOuterElem()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SourceTargetComponent);
