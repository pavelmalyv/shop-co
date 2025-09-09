import { getElement } from "@scripts/shared/utils/element";
import { ValidationForm } from "@scripts/shared/ui/ValidationForm";
import * as z from "zod";

export class Promo<T extends Element = HTMLElement> {
  #selectors = {
    form: "[data-js-cart-form-promo]",
    submitButton: "button[type=submit]",
  };

  #rootElement: T;
  #formElement: HTMLFormElement;
  #submitButtonElement: HTMLButtonElement;

  #validationForm: ValidationForm;
  #formSchema = z.object({
    promo: z.string().nonempty("Введите промокод"),
  });

  constructor(rootElement: T) {
    this.#rootElement = rootElement;
    this.#formElement = getElement<HTMLFormElement>(this.#selectors.form, this.#rootElement);
    this.#submitButtonElement = getElement<HTMLButtonElement>(
      this.#selectors.submitButton,
      this.#rootElement,
    );

    this.#validationForm = new ValidationForm({
      formElement: this.#formElement,
      schema: this.#formSchema,
    });

    this.#bindEvents();
  }

  #bindEvents = () => {
    this.#formElement.addEventListener("submit", this.#handleSubmitForm);
  };

  #handleSubmitForm = (e: SubmitEvent) => {
    e.preventDefault();

    if (this.#validationForm.validate()) {
      this.#submitButtonElement.disabled = true;

      console.log("TODO: send");

      this.#submitButtonElement.disabled = false;
    }
  };
}
