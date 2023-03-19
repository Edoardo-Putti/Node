import { Model, DataTypes } from 'sequelize';
import { sequelize } from '..';

export interface CouponAttributes {
  id?: number;
  productName: string;
  description: string;
  amount: number;
}

class Coupon extends Model<CouponAttributes> implements CouponAttributes {
  public id?: number;
  public productName!: string;
  public description!: string;
  public amount!: number;
}

sequelize.define('Coupon', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Coupon;
