import express, { Request, Response } from 'express';
import { ShoppingCart } from '../Models/ShoppingCart';
import BasketRepository from '../Repositories/BasketRepository';
import { IController } from './IController';

export class BasketController implements IController {
  public basePath = '/api/v1';
  public router = express.Router();
  private readonly _basketRepository: BasketRepository;
  constructor() {
    this._basketRepository = new BasketRepository();
    this.initRoutes();
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     ShoppingCart:
   *       type: object
   *       required:
   *         - userName
   *       properties:
   *         userName:
   *           type: string
   *           description: The username of the shopping cart owner.
   *         items:
   *           type: array
   *           description: The items in the shopping cart.
   *           items:
   *             $ref: '#/components/schemas/ShoppingCartItem'
   *     ShoppingCartItem:
   *       type: object
   *       required:
   *         - Quantity
   *         - Color
   *         - Price
   *         - ProuctId
   *         - ProductName
   *       properties:
   *         Quantity:
   *           type: number
   *           format: float
   *           description: The quantity of the item.
   *         Color:
   *           type: string
   *           description: The label tag of the item.
   *         Price:
   *           type: number
   *           format: float
   *           description: The price of the item.
   *         ProuctId:
   *           type: string
   *           description: The id of the item.
   *         ProductName:
   *           type: string
   *           description: The name of the item.
   */

  private initRoutes() {
    this.router.get(
      `${this.basePath}/GetBasket/:userName`,
      this.GetBasket.bind(this)
    );
    this.router.post(
      `${this.basePath}/UpdateBasket`,
      this.UpdateBasket.bind(this)
    );
    this.router.delete(
      `${this.basePath}/DeleteBasket/:userName`,
      this.DeleteBasket.bind(this)
    );
  }

  /**
   * @swagger
   * /api/v1/GetBasket/{userName}:
   *   get:
   *     tags: [Basket]
   *     summary: Retrieve the shopping cart of a user
   *     parameters:
   *       - in: path
   *         name: userName
   *         required: true
   *         description: The username of the shopping cart to retrieve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The shopping cart of the user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ShoppingCart'
   *       400:
   *         description: Invalid username parameter
   *       404:
   *         description: The shopping cart does not exist
   */
  public async GetBasket(req: Request, res: Response) {
    const { userName } = req.params;
    const basket = await this._basketRepository.GetBasket(userName);
    return res.status(200).json(basket ?? new ShoppingCart(userName));
  }

  /**
   * @swagger
   * /api/v1/UpdateBasket:
   *   post:
   *     tags: [Basket]
   *     summary: Update the shopping cart of a user
   *     requestBody:
   *       description: The updated shopping cart of the user
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ShoppingCart'
   *     responses:
   *       200:
   *         description: The updated shopping cart of the user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ShoppingCart'
   *       400:
   *         description: Invalid request body parameter
   *       404:
   *         description: The shopping cart does not exist
   */
  public async UpdateBasket(req: Request, res: Response): Promise<Response> {
    const basket = req.body as ShoppingCart;
    const updatedBasket = await this._basketRepository.UpdateBasket(basket);
    return res.status(200).json(updatedBasket);
  }

  // Define Swagger annotations for the `DeleteProduct` endpoint
  /**
   * @swagger
   * /api/v1/DeleteBasket/{userName}:
   *   delete:
   *     summary: Delete the shopping cart of a user
   *     tags: [Basket]
   *     parameters:
   *       - in: path
   *         name: userName
   *         required: true
   *         description: The username of the shopping cart to delete
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The shopping cart of the user has been deleted
   *       400:
   *         description: Invalid username parameter
   *       404:
   *         description: The shopping cart does not exist
   */
  public async DeleteBasket(req: Request, res: Response) {
    const { userName } = req.params;

    const result = await this._basketRepository.DeleteBasket(userName);
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
}
