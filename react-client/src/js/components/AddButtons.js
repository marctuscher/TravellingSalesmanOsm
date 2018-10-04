import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons'
import {faBars, faLocationArrow} from '@fortawesome/free-solid-svg-icons'
import '../../css/components/SidebarContent.css'
import '../../css/components/AddButtons.css'


export default class AddButtons extends React.Component {

    render(){
        return (
            <div className="containerbox">
                <button className="btn-addbox" onClick={this.props.addCategory}><FontAwesomeIcon icon={faBars}/></button>
                <button className="btn-addbox" onClick={this.props.addCurrent}><FontAwesomeIcon icon={faLocationArrow}/>></button>
            </div>
        )
    }
}