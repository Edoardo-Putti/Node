import { Schema, model } from 'mongoose';
import { IProduct } from './IProduct';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const productSchema = new Schema<IProduct>(
  {
    Name: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Summary: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    ImageFile: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
productSchema.set('versionKey', 'version');

productSchema.plugin(updateIfCurrentPlugin);

const Product = model<IProduct>('Product', productSchema);

export { Product };
