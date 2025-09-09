import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { getElement } from "@scripts/shared/utils/element";
import { getBreakpointsPx } from "@scripts/shared/utils/breakpoints";

const rootSelector = "[data-js-reviews-slider]";

class ReviewsSlider {
  #selectors = {
    buttonPrev: "[data-js-reviews-prev-button]",
    buttonNext: "[data-js-reviews-next-button]",
  };

  #rootElement: HTMLElement;
  #buttonPrevElement: HTMLElement;
  #buttonNextElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#buttonPrevElement = getElement(this.#selectors.buttonPrev);
    this.#buttonNextElement = getElement(this.#selectors.buttonNext);

    this.#initSlider();
  }

  #initSlider = () => {
    new Swiper(this.#rootElement, {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      modules: [Navigation],
      navigation: {
        enabled: true,
        prevEl: this.#buttonPrevElement,
        nextEl: this.#buttonNextElement,
      },
      breakpoints: {
        [getBreakpointsPx("xxl")]: {
          slidesPerView: "auto",
        },
        [getBreakpointsPx("lg")]: {
          slidesPerView: 3,
        },
        [getBreakpointsPx("md")]: {
          slidesPerView: 1.4,
        },
      },
    });
  };
}

export class ReviewsSliderCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new ReviewsSlider(element);
    });
  }
}
