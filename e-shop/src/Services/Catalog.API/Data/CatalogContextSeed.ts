import { IProduct } from '../models/IProduct';
import { Product } from '../models/Product';

export class CatalogContextSeed {
  public async SeedData() {
    const existingProduct: boolean = (await Product.countDocuments({})) > 0;
    if (!existingProduct) {
      Product.insertMany(this.GetPreconfigurationProducts());
    }
  }

  private GetPreconfigurationProducts() {
    const products: IProduct[] = [
      new Product({
        _id: '602d2149e773f2a3990b47f5',
        Name: 'IPhone X',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-1.png',
        Price: 950.0,
        Category: 'Smart Phone',
      }),
      new Product({
        _id: '602d2149e773f2a3990b47f6',
        Name: 'Samsung 10',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-2.png',
        Price: 840.0,
        Category: 'Smart Phone',
      }),
      new Product({
        _d: '602d2149e773f2a3990b47f7',
        Name: 'Huawei Plus',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-3.png',
        Price: 650.0,
        Category: 'White Appliances',
      }),
      new Product({
        _id: '602d2149e773f2a3990b47f8',
        Name: 'Xiaomi Mi 9',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-4.png',
        Price: 470.0,
        Category: 'White Appliances',
      }),
      new Product({
        _id: '602d2149e773f2a3990b47f9',
        Name: 'HTC U11+ Plus',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-5.png',
        Price: 380.0,
        Category: 'Smart Phone',
      }),
      new Product({
        _id: '602d2149e773f2a3990b47fa',
        Name: 'LG G7 ThinQ',
        Summary:
          "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
        Description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.',
        ImageFile: 'product-6.png',
        Price: 240.0,
        Category: 'Home Kitchen',
      }),
    ];
    return products;
  }
}
