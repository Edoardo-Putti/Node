import mongoose from 'mongoose';
import { CatalogContextSeed } from './CatalogContextSeed';

export class CatalogContext {
  constructor() {
    if (!process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL');

    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });

    const db = mongoose.connection;

    const ctx = new CatalogContextSeed();
    ctx.SeedData();
  }
}
