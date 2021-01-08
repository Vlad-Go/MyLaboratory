import './scss/style.scss';
import {JsSlider} from './plugins/JsSlider/src/main';
// // import {App} from './App';


const slider = document.getElementById('slider');


new JsSlider({
  slider_type: 'vertical', // vertical  or horizontal
  dots: true, // boolean
  dotClassName: 'slider__dot' // string || "dot" --default
}).init(slider);

// // new App().init();