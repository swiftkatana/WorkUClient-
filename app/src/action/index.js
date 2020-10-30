/* eslint-disable no-useless-escape */

import server from '../api/serverApi';
import { SIGN_OUT, CREATE_USER, LOGIN, CHANGE_LEGUAGE } from './types';




// eslint-disable-next-line no-unused-vars
const config = {
    onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
    }
}


export const createUser = (formValues, signIn) => async dispatch => {
    const res = await server.post('/register', formValues);

    dispatch({ type: CREATE_USER, payload: res.data })
    if (res.data !== 'eror' && res.data !== 'dup') {
        signIn(res.data._id);
    }

}
export const loginUser = (formValues, signIn) => async dispatch => {
    await server.post('/login', formValues).then(res => {
        io.emit('loginToTheWebSite', formValues.email);


        dispatch({ type: LOGIN, payload: res.data })

        if (!res.data.err) signIn(res.data._id);

    }).catch(err => {
        console.log(err)
    });




}

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}
export const signOut = () => {

    return {
        type: SIGN_OUT,
    };


}


export const changeLeg = (leg) => {
    return {
        type: CHANGE_LEGUAGE,
        payload: leg
    }
}