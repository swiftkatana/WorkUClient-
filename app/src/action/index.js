import { CHANGE_STYLE } from "./types"


export const changeStyle = (style) => {
    return {
        type: CHANGE_STYLE,
        payload: style
    }
}