import { MigrateDatabase } from './Migrations/MigrateDatabase';
import { Sequelize } from 'sequelize';
import { initCoupon } from './Models/Coupon';
import { server } from './server';

const start = async () => {
  if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  initCoupon(sequelize);

  await MigrateDatabase(sequelize);
  server.listen(80, () => {
    console.log('Catalog Service Running on 8000');
  });
};

start();
