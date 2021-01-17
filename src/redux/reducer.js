import * as actions from './types';

export const reducer = (state, action) => {
  let prevState;
  switch (action.type) {
    case actions.TEST:
      prevState = state.count;
      prevState = prevState + action.data;
      return {...state, count: prevState};
      break;
    default: return state;
  }
};