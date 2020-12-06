import {Router} from './core/Router/Router';

export class App {
  constructor(components) {
    this.components = components;
    this.router = new Router;
    this.pageChangeHandle = this.pageChangeHandle.bind(this);
  }

  init() {
    window.addEventListener('hashchange', this.pageChangeHandle);
    this.pageChangeHandle();
  }


  pageChangeHandle() {
    this.curentComponents = this.router.route();
    this.render();
  }
  render() {
    Object.keys(this.curentComponents).forEach((key)=>{
      new this.curentComponents[key]().templete;
    });
  }
  destroy() {}
}

//      TODO
//
// ## Store provide
// ## Emiter provide (optional)
// ## Improve File Structure
//