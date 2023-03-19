import { MigrateDatabase } from './Migrations/MigrateDatabase';
import { server } from './server';
import { Sequelize } from 'sequelize';

if (!process.env.DB) throw new Error('Missing DB');
if (!process.env.USER) throw new Error('Missing USER');
if (!process.env.PWD) throw new Error('Missing PWD');
if (!process.env.HOST) throw new Error('Missing HOST');
if (!process.env.PORT) throw new Error('Missing PORT');

export const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PWD,
  {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const start = async () => {
  testDbConnection();
  await MigrateDatabase();
  server.listen(80, () => {
    console.log('Catalog Service Running on 8000');
  });
};

start();
