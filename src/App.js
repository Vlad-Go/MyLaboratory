import {MainPage} from './pages/MainPage';
import {getStore} from './core/store/store';

export class App {
  constructor(components = [], $root) {
    this.components = components;
    this.$root = $root;
  }

  init() {
    this.Page.init();
  }
  destroy() {
    this.Page.destroy();
  }
  render() {
    const store = getStore();
    this.Page = new MainPage(this.components, store);
    this.$root.innerHTML = this.Page.toHTML();
    this.init();
  }
}

//      TODO
//
// ## Emiter provide (optional)
//