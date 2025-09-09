import * as z from "zod";

export class ValidationForm<K extends z.ZodType = z.ZodType> {
  #formElement: HTMLFormElement;
  #schema: K;
  #errorsElements: Map<string, HTMLElement> = new Map();

  constructor({
    formElement,
    schema,
    fieldsSelector = "[data-js-field]",
    errorsMessagesSelector = "[data-js-field-error-message]",
  }: {
    formElement: HTMLFormElement;
    schema: K;
    fieldsSelector?: string;
    errorsMessagesSelector?: string;
  }) {
    this.#formElement = formElement;
    this.#schema = schema;

    this.#formElement.querySelectorAll<HTMLElement>(fieldsSelector).forEach((element) => {
      const inputElement = element.querySelector<HTMLInputElement>("input");
      const errorElement = element.querySelector<HTMLInputElement>(errorsMessagesSelector);

      if (inputElement === null) {
        throw new Error(`Element "input" not found`);
      }

      if (errorElement === null) {
        throw new Error(`Element "${errorsMessagesSelector}" not found`);
      }

      this.#errorsElements.set(inputElement.name, errorElement);
    });
  }

  validate = () => {
    const formData = new FormData(this.#formElement);
    const result = this.#validateSchema(formData);
    this.#renderErrors(result.errors);

    return result.success;
  };

  #validateSchema = (formData: FormData) => {
    const result = this.#schema.safeParse(Object.fromEntries(formData.entries()));
    const errorsMessages = new Map<string, string[]>();

    if (result.success) {
      return { success: true, errors: errorsMessages };
    }

    for (const errorItem of result.error.issues) {
      for (const path of errorItem.path) {
        const fieldName = String(path);

        errorsMessages.set(fieldName, [
          ...(errorsMessages.get(fieldName) ?? []),
          errorItem.message,
        ]);
      }
    }

    return {
      success: false,
      errors: errorsMessages,
    };
  };

  #renderErrors = (errors: Map<string, string[]>) => {
    for (const [name] of errors) {
      if (this.#errorsElements.get(name) === undefined) {
        throw new Error(`Element for schema "${name}" not found`);
      }
    }

    for (const [fieldName, errorElement] of this.#errorsElements) {
      errorElement.textContent = "";
      errorElement.classList.remove("is-active");

      const errorMessages = errors.get(fieldName);
      if (errorMessages === undefined) {
        continue;
      }

      for (const message of errorMessages) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        errorElement.appendChild(messageElement);
      }

      errorElement.classList.add("is-active");
    }
  };
}
