import {DomListener} from './DomListener';

export class AppComponent extends DomListener {
  constructor(options) {
    super(options.listeners, options.rootName);
    this.options = options;
    this.store = options.store;
    this.child;
    this.$root;
  }
  init() {
    console.log(this.options);
    this.initListeners();
    this.$root = document.querySelector('.' + this.options.rootName);
  }
  destroy() {
    this.destroyListeners();
  }
  update(html) {
    this.$root.innerHTML = html;
  }
  insert(elem) {
    if (typeof elem === 'string') {
      this.child = elem;
    } else if (elem instanceof HTMLElement) {
      this.child = elem;
    } else if (elem[0] instanceof AppComponent) {
      const html = [];
      elem.forEach((Component) => {
        html.push(Component.templete);
      });
      this.child = html.join(' ');
    } else {
      throw new Error(`type of ${elem} isn't suported`);
    }
    return this;
  }


  subscribe(event, fn) {
    this.store.subscribe(event, fn);
  }
  unsubscribe(fn) {
    this.store.unsubscribe(fn);
  }
  dispatch(action) {
    this.store.dispatch(action);
  }
  getState() {
    console.log(this.store.getState());
    return this.store.getState();
  }
}