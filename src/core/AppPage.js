export class AppPage {
  constructor(components = [], store = {}) {
    this.components = components;
    this.store = store;
  }
  init() {}
  destroy() {}
  toHTML() {
    return ``;
  }
}