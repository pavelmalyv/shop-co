import { InputCounter } from "flowbite";
import { getElement } from "@scripts/shared/utils/element";

export class QuantityField<T extends Element = HTMLElement> {
  #selectors = {
    field: "[data-input-counter]",
    buttonIncrement: "[data-input-counter-increment]",
    buttonDecrement: "[data-input-counter-decrement]",
  };

  #quantityAttributes = {
    counterMin: "data-input-counter-min",
    counterMax: "data-input-counter-max",
  };

  #rootElement: T;
  #fieldElement: HTMLInputElement;
  #buttonIncrementElement: HTMLInputElement;
  #buttonDecrementElement: HTMLInputElement;

  #callbacks: { onChange: ((value: number) => void)[] } = {
    onChange: [],
  };

  constructor(rootElement: T) {
    this.#rootElement = rootElement;
    this.#fieldElement = getElement<HTMLInputElement>(this.#selectors.field, this.#rootElement);
    this.#buttonIncrementElement = getElement(this.#selectors.buttonIncrement, this.#rootElement);
    this.#buttonDecrementElement = getElement(this.#selectors.buttonDecrement, this.#rootElement);

    this.#initInputCounter();
    this.#bindEvents();
  }

  #initInputCounter = () => {
    const dataMin = this.#fieldElement.getAttribute(this.#quantityAttributes.counterMin);
    const minValue = dataMin !== null ? Number(dataMin) : null;

    const dataMax = this.#fieldElement.getAttribute(this.#quantityAttributes.counterMax);
    const maxValue = dataMax !== null ? Number(dataMax) : null;

    new InputCounter(
      this.#fieldElement,
      this.#buttonIncrementElement,
      this.#buttonDecrementElement,
      {
        maxValue,
        minValue,
        onIncrement: this.#handleFieldChange,
        onDecrement: this.#handleFieldChange,
      },
      {
        id: this.#fieldElement.id,
      },
    );
  };

  #bindEvents = () => {
    this.#fieldElement.addEventListener("change", this.#handleFieldChange);
  };

  #handleFieldChange = () => {
    this.#callbacks.onChange.forEach((callback) => callback(Number(this.#fieldElement.value)));
  };

  onChange = (callback: (value: number) => void) => {
    this.#callbacks.onChange.push(callback);
  };

  set value(value: number) {
    this.#fieldElement.value = String(value);
  }

  get value() {
    return Number(this.#fieldElement.value);
  }
}
