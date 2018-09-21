import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class SidebarContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            targets : []
        }
    }





    render(){
        return (
            <div> 
                <h3>Select your Targets</h3>
                <button onClick={()=> this.props.coreActions.tsp_held_karp()}>Calculate</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);