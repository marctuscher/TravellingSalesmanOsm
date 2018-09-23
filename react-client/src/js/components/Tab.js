
import React from 'react';
import * as coreActions from '../services/core/actions';
import '../../css/components/Tab.css'

export default class Tab extends React.PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        var className = "btn"
        if (this.props.active){
            className += " active"
        }
        return(
            <button className={className} onClick={this.props.onClick}>{this.props.name}</button>
        )
    }

}