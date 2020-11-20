import { CHANGE_STYLE } from "../action/types";


const INS = { view: { backgroundColor: "#7f71e3" } }
export default (state = INS, action) => {
    switch (action.type) {
        case CHANGE_STYLE:
            return { ...state, ...action.payload }

        default:
            return state
    }


} 