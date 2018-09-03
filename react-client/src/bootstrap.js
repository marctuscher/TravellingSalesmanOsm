import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import * as helpers from './helpers'
import thunk from 'redux-thunk'

let reducers = combineReducers({

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
    applyMiddleware(thunk)
)

export default store;