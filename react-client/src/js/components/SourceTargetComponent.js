import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/SourceTargetComponent.css'
import CategoryComponent from './CategoryComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'




export default class SourceTargetComponent extends React.Component {


    renderOuterElem(){
        var name = this.props.type== "source"? "Source": "Target"
        return (
            <div className="container">
            <div className="delete-btn" onClick={this.props.delete}><FontAwesomeIcon color="#fa8231" icon={faMinusSquare}></FontAwesomeIcon></div>
                <h6>{name}</h6>
                {this.renderInnerElem()}
            </div>
        )
    }


    renderInnerElem(){
        if (this.props.elem.mode === "category"){
            var defaultValue = this.props.elem.group?this.props.elem.group + ":" + this.props.elem.category:null;
            return (
                <div>
                    <p>Choose a category</p>
                    <CategoryComponent defaultValue={defaultValue} onChange={this.props.changeCategory}/>
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