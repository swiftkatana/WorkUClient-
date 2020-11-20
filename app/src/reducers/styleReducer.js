import { CHANGE_STYLE } from "../action/types";


const INS = { view: { backgroundColor: "#7f71e3" }, btn1: { backgroundColor: "#7f71e3" }, btn2: { backgroundColor: "#6f61ca" }, btn3: { backgroundColor: "#6f61ca" } }
export default (state = INS, action) => {
    switch (action.type) {
        case CHANGE_STYLE:
            return { ...state, ...action.payload }

        default:
            return state
    }


} 