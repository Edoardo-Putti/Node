import { IProduct } from '../Models/IProduct';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { IProductRepository } from './IProductRepository';

class ProductRepository implements IProductRepository {
  private model: Model<IProduct>;

  constructor(model: Model<IProduct>) {
    this.model = model;
  }

  async GetProducts(): Promise<IProduct[]> {
    const products = await this.model.find();
    return products;
  }

  async GetProductById(id: string): Promise<IProduct | null> {
    const product = await this.model.findById(id);
    return product;
  }

  async GetProductByName(name: string): Promise<IProduct[] | null> {
    const products = await this.model.find({ Name: name });
    return products;
  }

  async GetProductByCategory(categoryName: string): Promise<IProduct[] | null> {
    const products = await this.model.find({ Category: categoryName });
    return products;
  }

  async CreateProduct(productData: IProduct): Promise<IProduct> {
    const product = new this.model(productData);
    const newProduct = await product.save();
    return newProduct;
  }

  async UpdateProduct(product: IProduct): Promise<boolean> {
    try {
      const updateResult = (await this.model.findOneAndUpdate(
        { _id: product.id },
        product,
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      )) as UpdateWriteOpResult;
      return updateResult.acknowledged && updateResult.modifiedCount > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async DeleteProduct(id: string): Promise<boolean> {
    try {
      const deleteResult = (await this.model.findOneAndDelete({
        _id: id,
      })) as UpdateWriteOpResult;
      return deleteResult.acknowledged && deleteResult.modifiedCount > 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProductRepository;
