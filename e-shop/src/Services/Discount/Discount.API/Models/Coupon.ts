import { Model, DataTypes, Sequelize } from 'sequelize';

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
export function initCoupon(sequelize: Sequelize) {
  Coupon.init(
    {
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
    },
    {
      sequelize,
      tableName: 'Coupon',
    }
  );
  return Coupon;
}

// sq.sync()
//   .then(() => {
//     console.log('Coupon table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Unable to create table: ', error);
//   });

export default Coupon;
