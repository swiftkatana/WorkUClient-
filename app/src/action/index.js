/* eslint-disable no-useless-escape */
import server from '../api/serverApi';
import { SIGN_OUT, CREATE_USER, LOGIN, CHANGE_LEGUAGE } from './types';
import {LoginUrl} from '../api/apiKeys';



// eslint-disable-next-line no-unused-vars
const config = {
    onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
    }
}



export const createUser = (formValues,nav) => async dispatch => {
    const res = await server.post('/register', formValues);
    dispatch({ type: CREATE_USER, payload: res.data })
    if (res.data !== 'eror' && res.data !== 'dup') {
        signIn(res.data._id);
    }

}


export const loginUser = (formValues) => async dispatch => {
    await server.post(LoginUrl, formValues).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });

}




export const changeLeg = (leg) => {
    
    return {
        type: CHANGE_LEGUAGE,
        payload: leg
    }
}