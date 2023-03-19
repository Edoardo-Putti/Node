import { ShoppingCart } from '../Models/ShoppingCart';

export interface IBasketRepository {
  GetBasket(userName: string): Promise<ShoppingCart | null>;
  UpdateBasket(basket: ShoppingCart): Promise<ShoppingCart>;
  DeleteBasket(userName: string): Promise<boolean>;
}
