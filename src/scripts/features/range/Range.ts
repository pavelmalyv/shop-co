import noUiSlider, { type API } from "nouislider";
import wNumb, { type Instance } from "wnumb";
import { getElement } from "@scripts/shared/utils/element";

const rootSelector = "[data-js-range]";

class Range {
  #selectors = {
    slider: "[data-js-range-slider]",
    minValue: "[data-js-range-min-value]",
    maxValue: "[ data-js-range-max-value]",
  };

  #rootAttributes = {
    min: "data-min",
    max: "data-max",
  };

  #rootElement: HTMLElement;
  #sliderElement: HTMLElement;
  #minValueElement: HTMLElement;
  #maxValueElement: HTMLElement;
  #valueFormat: Instance;

  constructor(root: HTMLElement) {
    this.#rootElement = root;
    this.#sliderElement = getElement(this.#selectors.slider, this.#rootElement);
    this.#minValueElement = getElement(this.#selectors.minValue, this.#rootElement);
    this.#maxValueElement = getElement(this.#selectors.maxValue, this.#rootElement);
    this.#valueFormat = wNumb({ decimals: 0, thousand: " ", suffix: " ₽" });

    this.#initNoUiSlider();
  }

  #initNoUiSlider = () => {
    const minAttribute = this.#rootElement.getAttribute(this.#rootAttributes.min);
    if (minAttribute === null) {
      throw new Error(`Attribute "${this.#rootAttributes.min}" was not found`);
    }

    const maxAttribute = this.#rootElement.getAttribute(this.#rootAttributes.max);
    if (maxAttribute === null) {
      throw new Error(`Attribute "${this.#rootAttributes.max}" was not found`);
    }

    const min = Number(minAttribute);
    const max = Number(maxAttribute);

    const slider = noUiSlider.create(this.#sliderElement, {
      start: [min, max],
      connect: true,
      step: 1,
      margin: 1,
      range: {
        min,
        max,
      },
    });

    this.#bindEventsRange(slider);
  };

  #bindEventsRange = (slider: API) => {
    slider.on("update", (values) => this.#handleRangeUpdate(values));
  };

  #handleRangeUpdate = (values: (string | number)[]) => {
    const [minValue, maxValue] = values;

    this.#minValueElement.textContent = this.#valueFormat.to(Number(minValue));
    this.#maxValueElement.textContent = this.#valueFormat.to(Number(maxValue));
  };
}

export class RangeCollections {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new Range(element);
    });
  }
}
