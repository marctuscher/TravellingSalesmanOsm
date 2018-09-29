import React from 'react';
import * as coreActions from '../services/core/actions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/components/CategoryComponent.css'
import Dropdown from 'react-dropdown';

class CategoryComponent extends React.Component{

    render(){
        return (
            <div className="bordered">
                <Dropdown options={this.props.categories}>Please choose desired category</Dropdown>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        categories : state.core.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        coreActions: bindActionCreators(coreActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);

