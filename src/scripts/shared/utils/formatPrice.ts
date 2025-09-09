export function formatPrice(cents: number) {
  const price = cents / 100;
  return price.toLocaleString("ru-RU");
}
