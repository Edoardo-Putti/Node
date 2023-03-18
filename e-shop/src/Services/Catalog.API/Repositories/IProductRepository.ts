import { IProduct } from '../Models/IProduct';

export interface IProductRepository {
  GetProducts(): Promise<IProduct[]>;
  GetProductById(id: string): Promise<IProduct | null>;
  GetProductByName(name: string): Promise<IProduct[] | null>;
  GetProductByCategory(categoryName: string): Promise<IProduct[] | null>;
  CreateProduct(product: IProduct): Promise<IProduct>;
  UpdateProduct(product: IProduct): Promise<boolean>;
  DeleteProduct(id: string): Promise<boolean>;
}
