import { ShoppingCart } from '../Models/ShoppingCart';
import { IBasketRepository } from './IBasketRepository';
import { RedisClientType } from 'redis';
import { redisCache } from '../server';

class BasketRepository implements IBasketRepository {
  private redis: RedisClientType;

  constructor() {
    this.redis = redisCache;
  }

  async GetBasket(userName: string): Promise<ShoppingCart | null> {
    const basket = await this.redis.get(userName);
    if (!basket) {
      return null;
    }
    return JSON.parse(basket);
  }
  async UpdateBasket(basket: ShoppingCart): Promise<ShoppingCart> {
    await this.redis.set(basket.UserName, JSON.stringify(basket));
    return this.GetBasket(basket.UserName) as Promise<ShoppingCart>;
  }
  async DeleteBasket(userName: string): Promise<boolean> {
    const result = await this.redis.del(userName);
    return result > 0;
  }
}

export default BasketRepository;
