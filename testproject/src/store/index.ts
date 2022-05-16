import { createStore } from "redux";
import rootReducer from './reducers'
// interface Reducer {
//   collapsed: boolean,
//   color: string
// }
// const common: Reducer = {
//   collapsed: false,
//   color: '#fff'
// }
// function store(state = common, action: any) {
//   switch (action.type) {
//     case types.CHANGE_COLLAPSED:
//       return {
//         ...state,
//         collapsed: !state.collapsed
//       };
//     default:
//       return state
//   }
// }
let store = createStore(rootReducer)
export default store;