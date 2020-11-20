import { applyMiddleware, createStore, } from 'redux'
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index'
const createstorewithmiddleware = createStore(reducers, applyMiddleware(reduxThunk))
export default createstorewithmiddleware; 