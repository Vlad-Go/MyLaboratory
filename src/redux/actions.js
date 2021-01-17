import * as actions from './types';

export const test = (data) => {
  return {
    type: actions.TEST,
    data
  };
};