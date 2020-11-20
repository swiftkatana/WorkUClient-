import { combineReducers } from 'redux';
import styleReducer from './styleReducer';


export default combineReducers({
    styles: styleReducer,
}); 