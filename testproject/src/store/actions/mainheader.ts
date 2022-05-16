import * as types from '../action-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    changeCollapsed() {
        return { type: types.CHANGE_COLLAPSED }
    },
    changeColor(data: string) {
        return { type: types.CHANGE_COLOR, payload: data }
    }
}