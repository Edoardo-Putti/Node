import Coupon, { CouponAttributes } from '../Models/Coupon';
export class DiscountRepository {
  async getDiscount(productName: string): Promise<Coupon | CouponAttributes> {
    const coupon = await Coupon.findOne({
      where: { productName },
    });

    if (!coupon) {
      return {
        productName: 'No Discount',
        amount: 0,
        description: 'No Discount Desc',
      };
    }

    return coupon;
  }

  async createDiscount(coupon: Coupon): Promise<boolean> {
    const createdCoupon = await Coupon.create(coupon);
    return !!createdCoupon;
  }

  async updateDiscount(coupon: Coupon): Promise<boolean> {
    const [affectedCount] = await Coupon.update(coupon, {
      where: { id: coupon.id },
    });

    return affectedCount > 0;
  }

  async deleteDiscount(productName: string): Promise<boolean> {
    const affectedCount = await Coupon.destroy({
      where: { productName },
    });

    return affectedCount > 0;
  }
}
