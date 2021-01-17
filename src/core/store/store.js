import {LocalStoreProcessor} from '../../processors/LocalStoreProcessor';
import {reducer} from '../../redux/reducer';

export function getStore() {
  const Processor = new LocalStoreProcessor();
  let listeners = [];
  let state = Processor.getData();

  return {
    subscribe(event, fn) {
      listeners.push({
        event, fn
      });
    },
    unsubscribe(fn) {
      listeners = listeners.filter((listener) => listener.fn != fn);
    },
    dispatch(action) {
      state = reducer(state, action);
      Processor.saveData(state);
      listeners.forEach((listener) => {
        if (listener.event === action.type) {
          listener.fn(state);
        }
      });
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    }
  };
}