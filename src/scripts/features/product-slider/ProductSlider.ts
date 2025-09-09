import Swiper from "swiper";

import { getElement } from "@scripts/shared/utils/element";
import { Thumbs } from "swiper/modules";
import { getBreakpointsPx } from "@scripts/shared/utils/breakpoints";

const rootSelector = "[data-js-product-sliders]";

class ProductSlider {
  #selectors = {
    previewSlider: "[data-js-product-preview-slider]",
    mainSlider: "[data-js-product-main-slider]",
  };

  #rootElement: HTMLElement;
  #previewSlider: HTMLElement;
  #mainSlider: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#previewSlider = getElement(this.#selectors.previewSlider, this.#rootElement);
    this.#mainSlider = getElement(this.#selectors.mainSlider, this.#rootElement);

    this.#initSlider();
  }

  #initSlider = () => {
    const previewSwiper = new Swiper(this.#previewSlider, {
      slidesPerView: 3,
      direction: "horizontal",
      breakpoints: {
        [getBreakpointsPx("md")]: {
          direction: "vertical",
        },
      },
    });

    new Swiper(this.#mainSlider, {
      modules: [Thumbs],
      thumbs: {
        swiper: previewSwiper,
      },
    });
  };
}

export class ProductSliderCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new ProductSlider(element);
    });
  }
}
