import { CHANGE_STYLE, LOGIN_STYLE } from "./types"


export const changeStyle = (style) => {
    return {
        type: CHANGE_STYLE,
        payload: style
    }
}

export const changeLoginStyle = (style) => {
    return {
        type: LOGIN_STYLE,
        payload: style
    }
}