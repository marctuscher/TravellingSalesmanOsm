import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/TSPComponent.css'


class TSPComponent extends React.Component {


    constructor(props){
        super(props)
        this.search = this.search.bind(this)
    }
    
    search(){
        this.props.coreActions.tsp_held_karp();
    }


    render(){
        return (
            <div>My TSP COmpoentn
                <button onClick={this.search}></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TSPComponent);