import { IShoppingCartItem } from './IShoppingCartItem';

export class ShoppingCart {
  userName: string;
  items: IShoppingCartItem[];

  constructor(userName: string, items: IShoppingCartItem[] = []) {
    this.userName = userName;
    this.items = items;
  }

  get totalPrice(): number {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.Price * item.Quantity;
    }
    return totalPrice;
  }
}
