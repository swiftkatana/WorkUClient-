import { CHANGE_LEGUAGE } from "../action/types";



export default (state='heb',action)=>{
switch (action.type) {
    case 'HEB':
        
        return action.payload
    case'eng':

    return action.payload;
    default:
        return state
}


}