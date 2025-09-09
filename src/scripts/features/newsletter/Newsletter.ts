import { getElement } from "@scripts/shared/utils/element";
import { ValidationForm } from "@scripts/shared/ui/ValidationForm";
import * as z from "zod";

const rootSelector = "[data-js-newsletter-form]";

class Newsletter {
  #selectors = {
    submitButton: "button[type=submit]",
  };

  #formSchema = z.object({
    email: z.email(),
  });

  #rootElement: HTMLFormElement;
  #submitButton: HTMLButtonElement;
  #validationForm: ValidationForm;

  constructor(rootElement: HTMLFormElement) {
    this.#rootElement = rootElement;
    this.#submitButton = getElement(this.#selectors.submitButton, this.#rootElement);
    this.#validationForm = new ValidationForm({
      formElement: this.#rootElement,
      schema: this.#formSchema,
    });

    this.#bindEvents();
  }

  #bindEvents = () => {
    this.#rootElement.addEventListener("submit", this.#handleSubmitForm);
  };

  #handleSubmitForm = (e: SubmitEvent) => {
    e.preventDefault();

    if (this.#validationForm.validate()) {
      this.#submitButton.disabled = true;

      console.log("TODO: send");

      this.#submitButton.disabled = false;
    }
  };
}

export class NewsletterCollection {
  constructor() {
    document.querySelectorAll<HTMLFormElement>(rootSelector).forEach((element) => {
      new Newsletter(element);
    });
  }
}
