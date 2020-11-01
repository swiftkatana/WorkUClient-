import { combineReducers } from 'redux';

import userReducer from './userReducer'
import lenguageReducer from './lenguageReducer'

export default combineReducers({
    user: userReducer,
    len: lenguageReducer
});//