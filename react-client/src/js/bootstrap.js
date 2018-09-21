import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import * as helpers from './helpers'
import thunk from 'redux-thunk'
import coreMiddleware from './services/core/middleware';
import core from './services/core/reducer';

let reducers = combineReducers({
    core
});


let initialState = {
    core: {

    }
}

initialState.core = Object.assign({}, initialState.core, helpers.getStorage('core'))

console.log(initialState)

let store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk, coreMiddleware)
)

export default store;