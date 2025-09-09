import { getElement } from "@scripts/shared/utils/element";
import { QuantityField } from "@scripts/features/quantity-field";

const rootSelector = "[data-js-add-cart]";

class AddCart {
  #selectors = {
    button: "[data-js-add-cart-button]",
  };

  #rootElement: HTMLElement;
  #buttonElement: HTMLElement;
  #quantityField: QuantityField;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#buttonElement = getElement(this.#selectors.button, this.#rootElement);
    this.#quantityField = new QuantityField(this.#rootElement);

    this.#bindEvents();
  }

  #bindEvents = () => {
    this.#buttonElement.addEventListener("click", this.#handleButtonClick);
    this.#quantityField.onChange(this.#handleQuantityFieldChange);
  };

  #handleButtonClick = () => {
    this.#quantityField.value = 1;
    this.#handleToggle();
  };

  #handleQuantityFieldChange = (value: number) => {
    if (value === 0) {
      this.#handleToggle();
    }
  };

  #handleToggle = () => {
    const isActive = this.#rootElement.classList.contains("is-active");
    this.#rootElement.classList.toggle("is-active", !isActive);
  };
}

export class AddCartCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new AddCart(element);
    });
  }
}
