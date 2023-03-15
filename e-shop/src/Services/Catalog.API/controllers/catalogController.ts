import express, { Request, Response } from 'express';
import { Product } from '../models/Product';
import { IProduct } from '../models/IProduct';
import ProductRepository from '../Repositories/ProductRepository';
import { IController } from './IController';
import logger from '../logger';
import { NotFoundError } from '@epmicro/common';

export class CatalogController implements IController {
  public basePath = '/api/v1';
  public router = express.Router();
  private readonly _productRepository: ProductRepository;
  private readonly _logger;
  constructor() {
    this._productRepository = new ProductRepository(Product);
    this._logger = logger;
    this.initRoutes();
  }
  /**
   * @swagger
   * components:
   *   schemas:
   *     Product:
   *       type: object
   *       properties:
   *         Name:
   *           type: string
   *         Category:
   *           type: string
   *         Summary:
   *           type: string
   *         Description:
   *           type: string
   *         ImageFile:
   *           type: string
   *         Price:
   *           type: number
   *       required:
   *         - Name
   *         - Category
   *         - Summary
   *         - Description
   *         - ImageFile
   *         - Price
   *     NotFoundError:
   *       type: object
   *       properties:
   *         statusCode:
   *           type: integer
   *           format: int32
   *           example: 404
   *         message:
   *           type: string
   *           example: Route not found
   *         errors:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *                 example: Page not found!
   *       required:
   *         - statusCode
   *         - message
   *         - errors
   */

  // Define Swagger annotations for the `GetProducts` endpoint
  /**
   * @swagger
   * /api/v1/GetProducts:
   *   get:
   *     summary: Get a list of all products.
   *     tags: [Retrieve]
   *     responses:
   *       200:
   *         description: A list of products.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  private async GetProducts(req: Request, res: Response) {
    const products: IProduct[] = await this._productRepository.GetProducts();
    return res.status(200).send(products);
  }
  // Define Swagger annotations for the `GetProducts` endpoint
  /**
   * @swagger
   * /api/v1/GetProductById/{id}:
   *   get:
   *     summary: Get a product by ID
   *     tags: [Retrieve]
   *     description: Retrieve a product by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the product to retrieve.
   *     responses:
   *       200:
   *         description: The requested product.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundError'
   */

  private async GetProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product: IProduct | null =
      await this._productRepository.GetProductById(id);
    if (!product) {
      this._logger.error(`Product with id: ${id} not found`);
      throw new NotFoundError();
    }
    return res.status(200).send(product);
  }
  // Define Swagger annotations for the `GetProductByName` endpoint
  /**
   * @swagger
   * /api/v1/GetProductByName/{name}:
   *   get:
   *     tags: [Retrieve]
   *     summary: Get products by name
   *     parameters:
   *       - in: path
   *         name: name
   *         schema:
   *           type: string
   *         required: true
   *         description: Name of the product to search for
   *     responses:
   *       200:
   *         description: A list of products that match the provided name
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  private async GetProductByName(req: Request, res: Response) {
    const { name } = req.params;
    const products: IProduct[] | null =
      await this._productRepository.GetProductByName(name);

    return res.status(200).send(products);
  }
  // Define Swagger annotations for the `GetProductByCategory` endpoint
  /**
   * @swagger
   * /api/v1/GetProductByCategory/{category}:
   *   get:
   *     tags: [Retrieve]
   *     summary: Get products by category
   *     parameters:
   *       - in: path
   *         name: category
   *         schema:
   *           type: string
   *         required: true
   *         description: Category of the products to search for
   *     responses:
   *       200:
   *         description: A list of products that belong to the provided category
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  private async GetProductByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const products: IProduct[] | null =
      await this._productRepository.GetProductByCategory(category);

    return res.status(200).send(products);
  }
  // Define Swagger annotations for the `CreateProduct` endpoint
  /**
   * @swagger
   * /api/v1/CreateProduct:
   *   post:
   *     summary: Create a new product
   *     tags: [Catalog]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       201:
   *         description: The newly created product
   *         content:
   *           application/json:
   *             schema:
   *               $ref:'#/components/schemas/Product'
   */
  private async CreateProduct(req: Request, res: Response) {
    const newProduct: IProduct = req.body;
    const createdProduct = await this._productRepository.CreateProduct(
      newProduct
    );
    res.status(201).send(createdProduct);
  }
  // Define Swagger annotations for the `UpdateProduct` endpoint
  /**
   * @swagger
   * /api/v1/UpdateProduct:
   *   put:
   *     summary: Update a product
   *     tags: [Catalog]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       200:
   *         description: The updated product
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found
   */
  private async UpdateProduct(req: Request, res: Response) {
    const productToBeUpdated: IProduct = req.body;
    return await this._productRepository.UpdateProduct(productToBeUpdated);
  }
  // Define Swagger annotations for the `DeleteProduct` endpoint
  /**
   * @swagger
   * /api/v1/DeleteProduct/{id}:
   *   delete:
   *     summary: Delete a product by ID
   *     tags: [Catalog]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Product deleted
   *       404:
   *         description: Product not found
   */
  private async DeleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    return await this._productRepository.DeleteProduct(id);
  }

  private initRoutes() {
    this.router.get(
      `${this.basePath}/GetProducts`,
      this.GetProducts.bind(this)
    );
    this.router.get(
      `${this.basePath}/GetProductById/:id`,
      this.GetProductById.bind(this)
    );
    this.router.get(
      `${this.basePath}/GetProductByName/:name`,
      this.GetProductByName.bind(this)
    );
    this.router.get(
      `${this.basePath}/GetProductByCategory/:category`,
      this.GetProductByCategory.bind(this)
    );
    this.router.post(
      `${this.basePath}/CreateProduct`,
      this.CreateProduct.bind(this)
    );
    this.router.put(
      `${this.basePath}/UpdateProduct`,
      this.UpdateProduct.bind(this)
    );
    this.router.delete(
      `${this.basePath}/DeleteProduct/:id`,
      this.DeleteProduct.bind(this)
    );
  }
}
