import { IShoppingCartItem } from './IShoppingCartItem';

export class ShoppingCart {
  UserName: string;
  Items: IShoppingCartItem[];

  constructor(userName: string, items: IShoppingCartItem[] = []) {
    this.UserName = userName;
    this.Items = items;
  }

  get totalPrice(): number {
    let totalPrice = 0;
    for (const item of this.Items) {
      totalPrice += item.Price * item.Quantity;
    }
    return totalPrice;
  }
}
