export class DomListener {
  constructor(listeners = [], rootName) {
    this.listeners = listeners;
    this.rootName = rootName;
  }
  initListeners() {
    this.$root = document.querySelector(`.${this.rootName}`);
    this.listeners.forEach((listener) => {
      const callback = getFuncName(listener);
      if (!this[callback]) {
        throw new Error(`You don't create callback ${callback} 
                         in ${this.name}`);
      }
      this[callback] = this[callback].bind(this);
      this.$root.addEventListener(listener, this[callback] );
    });
  }
  destroyListeners() {
    this.listeners.forEach((listener) => {
      const callback = getFuncName(listener);
      this.$root.removeEventListener(listener, this[callback]);
    });
  }
}

const getFuncName = (listener) => {
  const CapitalLetter = listener[0].toUpperCase();
  return 'on' + CapitalLetter +listener.slice(1);
};