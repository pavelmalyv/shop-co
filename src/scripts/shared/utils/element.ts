export const getElement = <T extends Element = HTMLElement>(
  selector: string,
  parent: Element | Document = document,
) => {
  const element = parent.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element "${selector}" not found`);
  }

  return element;
};
