import { CHANGE_STYLE, LOGIN_STYLE } from "../action/types";


const INS = { view: { backgroundColor: "#7f71e3" }, btn1: { backgroundColor: "#7f71e3" }, btn2: { backgroundColor: "#6f61ca" }, btn3: { backgroundColor: "#584DA1" } }
export default (state = INS, action) => {
    switch (action.type) {
        case CHANGE_STYLE:
            return { ...state, ...action.payload }
        case LOGIN_STYLE:
            if (!action.payload.view) return state
            return { ...action.payload }
        default:
            return state
    }


} 