import {LaboratoryMainComponent} from '../components/LaboratoryMainComponent';
import {AppPage} from '../core/AppPage';

export class MainPage extends AppPage {
  constructor(components, store ) {
    super(components, store );
  }
  toHTML() {
    this.components = this.components.map((Component) => {
      return new Component(this.store);
    });
    this.mainComponent =
    new LaboratoryMainComponent(this.store).insert(this.components);
    return this.mainComponent.templete;
  }
  init() {
    super.init();
    this.mainComponent.init();
    this.components.forEach((Component) => Component.init());
    document.body.style.height = window.innerHeight + 'px';
  }
  destroy() {
    super.destroy();
    this.mainComponent.destroy();
    this.components.forEach((Component) => Component.destroy());
  }
}