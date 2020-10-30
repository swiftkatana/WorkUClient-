import { combineReducers } from 'redux';


import userReducer from './userReducer'
import leguageReducer from './leguageReducer'
export default combineReducers({
    user: userReducer,
    leg: leguageReducer
});