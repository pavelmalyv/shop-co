import { getElement } from "@scripts/shared/utils/element";

const rootSelector = "[data-js-top-banner]";

class TopBanner {
  #selectors = {
    closeButton: "[data-js-top-banner-close-button]",
  };

  #rootElement: Element;
  #closeButtonElement: Element;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#closeButtonElement = getElement(this.#selectors.closeButton);
    this.#bindEvents();
  }

  #bindEvents = () => {
    this.#closeButtonElement.addEventListener("click", this.#handleCloseButton);
  };

  #handleCloseButton = () => {
    this.#rootElement.remove();
  };
}

export class TopBannerCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new TopBanner(element);
    });
  }
}
