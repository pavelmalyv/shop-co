import { QuantityField } from "./QuantityField";
import { getElement } from "./utils/element";
import { formatPrice } from "./utils/formatPrice";
import { ValidationForm } from "./ValidationForm";
import * as z from "zod";

const rootSelector = "[data-js-cart]";

class Cart {
  #selectors = {
    card: "[data-js-cart-card]",
    form: "[data-js-cart-form]",
    total: "[data-js-cart-total]",
    discount: "[data-js-cart-discount]",
    discountSymbol: "[data-js-cart-discount-symbol]",
    originalPrice: "[data-js-cart-original-price]",
    formPromo: "[data-js-cart-form-promo]",
    checkoutButton: "[data-js-cart-checkout-button]",
    deleteButton: "[data-js-cart-delete-button]",
    submitButton: "button[type=submit]",
  };

  #fieldsNames = {
    price: "price",
    discount: "discount",
  };

  #formSchema = z.object({
    promo: z.string().nonempty("Введите промокод"),
  });

  #rootElement: HTMLElement;
  #totalElement: HTMLElement;
  #discountElement: HTMLElement;
  #originalPriceElement: HTMLElement;
  #checkoutButtonElement: HTMLButtonElement;
  #formPromoElement: HTMLFormElement;
  #submitButtonPromoElement: HTMLButtonElement;
  #deleteButtonsCollection: NodeListOf<HTMLElement>;

  #quantityFields: { [key in string]: QuantityField } = {};
  #validationForm: ValidationForm;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#totalElement = getElement(this.#selectors.total, this.#rootElement);
    this.#discountElement = getElement(this.#selectors.discount, this.#rootElement);
    this.#originalPriceElement = getElement(this.#selectors.originalPrice, this.#rootElement);
    this.#formPromoElement = getElement<HTMLFormElement>(
      this.#selectors.formPromo,
      this.#rootElement,
    );
    this.#submitButtonPromoElement = getElement<HTMLButtonElement>(
      this.#selectors.submitButton,
      this.#formPromoElement,
    );
    this.#checkoutButtonElement = getElement<HTMLButtonElement>(
      this.#selectors.checkoutButton,
      this.#rootElement,
    );

    this.#deleteButtonsCollection = this.#rootElement.querySelectorAll<HTMLInputElement>(
      this.#selectors.deleteButton,
    );

    this.#validationForm = new ValidationForm({
      formElement: this.#formPromoElement,
      schema: this.#formSchema,
    });

    this.#initQuantityField();
    this.#bindEvents();
    this.#calculateTotal();
  }

  #initQuantityField = () => {
    this.#getFormsCollection().forEach(
      (element) => (this.#quantityFields[element.id] = new QuantityField(element)),
    );
  };

  #bindEvents = () => {
    this.#deleteButtonsCollection.forEach((element) =>
      element.addEventListener("click", this.#handleDeleteButton),
    );

    this.#formPromoElement.addEventListener("submit", this.#handleSubmitPromo);

    for (const key in this.#quantityFields) {
      this.#quantityFields[key].onChange(this.#handleQuantityFieldChange);
    }
  };

  #handleDeleteButton = (e: MouseEvent) => {
    const target = e.target;
    if (!target || !(target instanceof Element)) {
      return;
    }

    const parentCardElement = target.closest(this.#selectors.card);
    parentCardElement?.remove();

    this.#calculateTotal();
  };

  #handleQuantityFieldChange = () => {
    this.#calculateTotal();
  };

  #handleSubmitPromo = (e: SubmitEvent) => {
    e.preventDefault();

    if (this.#validationForm.validate()) {
      this.#submitButtonPromoElement.disabled = true;

      console.log("TODO: send");

      this.#submitButtonPromoElement.disabled = false;
    }
  };

  #calculateTotal = () => {
    let originalPrice = 0;
    let discount = 0;
    let total = 0;

    this.#getFormsCollection().forEach((element) => {
      const data = new FormData(element);
      const quantity = this.#quantityFields[element.id].value;

      const originalPriceCurrent = Number(data.get(this.#fieldsNames.price)) * quantity;
      const discountCurrent = Number(data.get(this.#fieldsNames.discount)) * quantity;
      const totalCurrent = originalPriceCurrent - discountCurrent;

      originalPrice += originalPriceCurrent;
      discount += discountCurrent;
      total += totalCurrent;
    });

    this.#updateTotalUI({ originalPrice, discount, total });
  };

  #updateTotalUI = ({
    originalPrice,
    discount,
    total,
  }: {
    originalPrice: number;
    discount: number;
    total: number;
  }) => {
    this.#originalPriceElement.textContent = formatPrice(originalPrice);
    this.#discountElement.textContent = discount === 0 ? "0" : "-" + formatPrice(discount);
    this.#totalElement.textContent = formatPrice(total);

    this.#checkoutButtonElement.disabled = total === 0;
  };

  #getFormsCollection = () => {
    return this.#rootElement.querySelectorAll<HTMLFormElement>(this.#selectors.form);
  };
}

export class CartCollection {
  constructor() {
    document.querySelectorAll<HTMLElement>(rootSelector).forEach((element) => {
      new Cart(element);
    });
  }
}
