import * as types from '../action-types';

interface Reducer {
    collapsed: boolean,
    color: string
}
const common: Reducer = {
    collapsed: false,
    color: '#ccc'
}
function mianheader(state = common, action: any) {
    switch (action.type) {
        case types.CHANGE_COLLAPSED:
            return {
                ...state,
                collapsed: !state.collapsed
            };
        case types.CHANGE_COLOR:
            return {
                ...state,
                color: action.payload
            }
        default:
            return state
    }
}
export default mianheader;