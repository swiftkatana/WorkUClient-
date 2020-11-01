import { createStore, } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk';


const store = createStore(reducers, reduxThunk);

export default store;