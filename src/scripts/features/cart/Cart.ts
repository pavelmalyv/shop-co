import { QuantityField } from "@scripts/features/quantity-field";
import { getElement } from "@scripts/shared/utils/element";
import { formatPrice } from "@scripts/shared/utils/formatPrice";
import { Promo } from "./Promo";
import { CartService } from "./CartService";

const rootSelector = "[data-js-cart]";

class Cart {
  #selectors = {
    card: "[data-js-cart-card]",
    form: "[data-js-cart-form]",
    total: "[data-js-cart-total]",
    discount: "[data-js-cart-discount]",
    originalPrice: "[data-js-cart-original-price]",
    checkoutButton: "[data-js-cart-checkout-button]",
    deleteButton: "[data-js-cart-delete-button]",
  };

  #fieldsNames = {
    price: "price",
    discount: "discount",
  };

  #rootElement: HTMLElement;
  #totalElement: HTMLElement;
  #discountElement: HTMLElement;
  #originalPriceElement: HTMLElement;
  #checkoutButtonElement: HTMLButtonElement;
  #deleteButtonsCollection: NodeListOf<HTMLElement>;

  #quantityFields: { [key in string]: QuantityField } = {};
  #cartService: CartService;

  constructor(rootElement: HTMLElement) {
    this.#rootElement = rootElement;
    this.#totalElement = getElement(this.#selectors.total, this.#rootElement);
    this.#discountElement = getElement(this.#selectors.discount, this.#rootElement);
    this.#originalPriceElement = getElement(this.#selectors.originalPrice, this.#rootElement);
    this.#checkoutButtonElement = getElement<HTMLButtonElement>(
      this.#selectors.checkoutButton,
      this.#rootElement,
    );

    this.#deleteButtonsCollection = this.#rootElement.querySelectorAll<HTMLInputElement>(
      this.#selectors.deleteButton,
    );

    new Promo(this.#rootElement);
    this.#cartService = new CartService();

    this.#initQuantityField();
    this.#bindEvents();
    this.#updateCartData();
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

    this.#updateCartData();
  };

  #handleQuantityFieldChange = () => {
    this.#updateCartData();
  };

  #updateCartData = () => {
    this.#cartService.clear();

    this.#getFormsCollection().forEach((element) => {
      const data = new FormData(element);
      const quantity = this.#quantityFields[element.id].value;
      const price = Number(data.get(this.#fieldsNames.price));
      const discount = Number(data.get(this.#fieldsNames.discount));

      this.#cartService.addItem({
        quantity,
        price,
        discount,
      });
    });

    this.#updateTotalUI();
  };

  #updateTotalUI = () => {
    const { originalPrice, discount, total } = this.#cartService.totals;

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
