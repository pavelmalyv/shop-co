type CartItem = {
  quantity: number;
  price: number;
  discount: number;
};

type CartItems = CartItem[];

export class CartService {
  #items: CartItems = [];

  constructor() {}

  addItem = (item: CartItem) => {
    this.#items.push(item);
  };

  clear = () => {
    this.#items = [];
  };

  get totals() {
    let originalPrice = 0;
    let discount = 0;
    let total = 0;

    for (const item of this.#items) {
      const originalPriceCurrent = item.price * item.quantity;
      const discountCurrent = item.discount * item.quantity;
      const totalCurrent = originalPriceCurrent - discountCurrent;

      originalPrice += originalPriceCurrent;
      discount += discountCurrent;
      total += totalCurrent;
    }

    return { originalPrice, discount, total };
  }
}
