import { NEXT_SLIDE, PREV_SLIDE, VERTICAL } from "./constants.js";

export const css = (el, styles = {}) =>{
  if (typeof styles === 'object') {
    Object.keys(styles).forEach((style)=>{
      el.style[style] = styles[style]
    });
  }else if (typeof styles === 'string') {
    return el.style[styles];
  }

}

export const clearNode = (node) => { 
    node.innerHTML = "";
}

export const getSliderDirection = (cords , sliderType) => {
  let currentCords = 
    sliderType === VERTICAL ? cords.y : cords.x;
   if (currentCords.start < currentCords.finall) {
      return PREV_SLIDE;
   } else if(currentCords.start > currentCords.finall) {
      return NEXT_SLIDE;
   }
}