import Swiper from "swiper";
import { getBreakpointsPx } from "@scripts/shared/utils/breakpoints";

const rootSelector = "[data-js-category-slider]";

class CategorySlider {
  #rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#initSlider();
  }

  #initSlider = () => {
    new Swiper(this.#rootElement, {
      slidesPerView: 1.8,
      breakpoints: {
        [getBreakpointsPx("xl")]: {
          slidesPerView: 4,
        },
        [getBreakpointsPx("lg")]: {
          slidesPerView: 2.7,
        },
        [getBreakpointsPx("md")]: {
          slidesPerView: 2.3,
        },
      },
    });
  };
}

export class CategorySliderCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new CategorySlider(element);
    });
  }
}
