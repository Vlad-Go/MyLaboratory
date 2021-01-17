import {initState} from '../redux/initState';
import {reducer} from '../redux/reducer';

export class LocalStoreProcessor {
  constructor() {
    this.localDataName = 'Laboratory-app';
  }
  getData() {
    const state = JSON.parse(localStorage.getItem(this.localDataName));
    return state ? state : reducer(initState, {type: '__INIT__'});
  }
  saveData(data) {
    localStorage.setItem(this.localDataName, JSON.stringify(data));
  }
}