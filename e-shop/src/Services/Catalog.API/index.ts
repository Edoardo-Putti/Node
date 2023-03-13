import { server } from './server';
import mongoose from 'mongoose';
import { CatalogContext } from './Data/CatalogContext';

mongoose.set('strictQuery', false);

const start = async () => {
  const ctx = new CatalogContext();

  server.listen(80, () => {
    console.log('Catalog Service Running on 8000');
  });
};

start();
