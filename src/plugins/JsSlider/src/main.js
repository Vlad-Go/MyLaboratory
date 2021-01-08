import {HORIZONTAL, VERTICAL, TrackCLassName,
  FIRST_SLIDE, PREV_SLIDE, NEXT_SLIDE} from './constants.js';
import {clearNode, css, getSliderDirection} from './functions.js';


export class JsSlider {
  constructor({slider_type, dots, dotClassName}) {
    this.slider_type = slider_type || HORIZONTAL;
    this.dots = dots || true;
    this.dotClassName = dotClassName || 'dot';

    this.currentDotClassName = 'current-dot';
    this.slider = null;
    this.track = null;
    this.dotButtons = [];
    this.sliderOpitons = {
      height: null,
      width: null,
      slidesAmount: null,
      currentSlide: 1
    };
    this.touchCords = {
      x: {
        start: 1,
        finall: null
      },
      y: {
        start: null,
        finall: null
      }
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  _createTrack(slides) {
    // const HorizontalStyle = {flexDirection : 'row'};
    const track = document.createElement('div');
    track.classList.add(TrackCLassName);
    css(track, {
      position: 'absolute',
      height: this.sliderOpitons.height +'px',
      width: this.sliderOpitons.width +'px'
      // display: "flex",
      // ...HorizontalStyle,
    });

    slides.forEach((slide) => {
      track.append(slide);
    });

    return track;
  }
  _createDots() {
    const dotsPannel = document.createElement('div');
    dotsPannel.classList.add('dots-pannel');
    css(dotsPannel, {
      position: 'absolute',
      zIndex: '100'
      // display: 'flex',
      // flexDirection: this.slider_type === VERTICAL ? 'column' : 'row',
      // justifyContent: 'space-evenly',
      // height: this.slider_type === VERTICAL ? '100%' : 'auto',

    });

    for (let i = 0; i < this.sliderOpitons.slidesAmount; i++) {
      const slideIndex = i+1;

      const dot = document.createElement('button');
      dot.classList.add(this.dotClassName);
      if (slideIndex === this.sliderOpitons.currentSlide) {
        dot.classList.add(this.currentDotClassName);
      }

      dot.addEventListener('click', () => this.setSlide(slideIndex));

      dotsPannel.append(dot);
      this.dotButtons.push(dot);
    }
    return dotsPannel;
  }
  _setStyles(firstSlide) {
    this.sliderOpitons.height = firstSlide.offsetHeight;
    this.sliderOpitons.width = firstSlide.offsetWidth;

    css(this.slider, {
      position: 'relative',
      // overflow : "hidden",
      width: this.sliderOpitons.width +'px',
      height: this.sliderOpitons.height +'px'
    }
    );
  }
  _navigate(direction) {
    const lastSlide = this.sliderOpitons.slidesAmount;

    if (direction === PREV_SLIDE) {
      if (this.sliderOpitons.currentSlide === FIRST_SLIDE) {
        this.setSlide(lastSlide);
      } else {
        this.setSlide(this.sliderOpitons.currentSlide - 1);
      }
    } else if (direction === NEXT_SLIDE) {
      if (this.sliderOpitons.currentSlide === lastSlide) {
        this.setSlide(FIRST_SLIDE);
      } else {
        this.setSlide(this.sliderOpitons.currentSlide + 1);
      }
    }
  }

  createSlider() {
    const slides = Array.from(this.slider.children);
    this.sliderOpitons.slidesAmount = slides.length;

    const trackWrapper = document.createElement('div');
    trackWrapper.classList.add('track-wrapper');


    // if(this.slider_type === VERTICAL){
    //   this._setVerticalStyles(slides);
    // }
    this._setStyles(slides[0]);
    css(trackWrapper, {
      position: 'relative',
      overflow: 'hidden',
      width: this.sliderOpitons.width +'px',
      height: this.sliderOpitons.height +'px'
    });

    this.track = this._createTrack(slides);
    clearNode(this.slider);
    trackWrapper.append(this.track);
    this.slider.append(trackWrapper);
    if (this.dots) {
      const dotsPannel = this._createDots();
      this.slider.append(dotsPannel);
    }
  }
  setSlide(slideNumber) {
    const cssProp = this.slider_type === VERTICAL ? 'top' : 'left';
    const stepValue = this.slider_type === VERTICAL ? 'height' : 'width';

    this.sliderOpitons.currentSlide = slideNumber;
    css(this.track, {
      [cssProp]: (this.sliderOpitons.currentSlide -1) * (-this.sliderOpitons[stepValue]) + 'px'
    });

    this.dotButtons.forEach((dot) => dot.classList.remove(this.currentDotClassName));
    this.dotButtons[slideNumber-1].classList.add(this.currentDotClassName);
  }

  onMouseDown(event) {
    this.touchCords.x.start = event.clientX;
    this.touchCords.y.start = event.clientY;
    this.slider.addEventListener('mouseup', this.onMouseUp);
  }
  onMouseUp(event) {
    this.touchCords.x.finall = event.clientX;
    this.touchCords.y.finall = event.clientY;

    const direction = getSliderDirection(this.touchCords, this.slider_type);
    this._navigate(direction);

    this.slider.removeEventListener('mouseup', this.onMouseUp);
  }
  initListeners() {
    this.slider.addEventListener('mousedown', this.onMouseDown);
  }

  init(slider) {
    this.slider = slider;
    this.createSlider();
    this.initListeners();
  }
}
// -------------- Usage
// const slider = document.getElementById('slider');


// new JsSlider({
//   slider_type: 'vertical', // vertical  or horizontal
//   dots: true, // boolean
//   dotClassName: 'slider__dot' // string || "dot" --default
// }).init(slider);