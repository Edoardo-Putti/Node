import { QueryInterface } from 'sequelize/types';
import { sequelize } from '..';
import { DataTypes } from 'sequelize';
import Coupon from '../Models/Coupon';

export async function MigrateDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection to db has been established successfully.');
    console.log('Starting Migration');
    const queryInterface = sequelize.getQueryInterface() as QueryInterface;
    await queryInterface.dropTable('Coupon');
    await queryInterface.createTable('Coupon', {
      id: {
        type: DataTypes.INTEGER,
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

    await Coupon.bulkCreate([
      { productName: 'IPhone X', description: 'IPhone Discount', amount: 150 },
      {
        productName: 'Samsung 10',
        description: 'Samsung Discount',
        amount: 100,
      },
    ]);

    console.log('Database migration successful.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
