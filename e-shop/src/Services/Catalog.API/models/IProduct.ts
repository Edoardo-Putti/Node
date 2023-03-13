import { Document } from 'mongoose';

export interface IProduct extends Document {
  Name: string;
  Category: string;
  Summary: string;
  Description: string;
  ImageFile: string;
  Price: number;
}
