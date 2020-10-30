
import { CREATE_USER, LOGIN, SIGN_OUT, NEW_FRIEND, UPDATE_STATUS_FRIEND, DELETE_FRIEND } from '../action/types'




export default userReducer => (state = null, action) => {
    switch (action.type) {
        case CREATE_USER: return action.payload
        case LOGIN: return action.payload
        case SIGN_OUT: return null;

        default: return state;
    }

}