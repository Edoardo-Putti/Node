import Coupon, { CouponAttributes } from '../Models/Coupon';

export interface IBasketRepository {
  GetDiscount(productName: string): Promise<Coupon | CouponAttributes>;
  CreateDiscount(coupon: Coupon): Promise<boolean>;
  UpdateDiscount(coupon: Coupon): Promise<boolean>;
  DeleteDiscount(productName: string): Promise<boolean>;
}
