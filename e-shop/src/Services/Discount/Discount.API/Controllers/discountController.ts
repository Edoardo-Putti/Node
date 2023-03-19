import express, { Request, Response } from 'express';
import Coupon, { CouponAttributes } from '../Models/Coupon';
import { DiscountRepository } from '../Repositories/DiscountRepository';
import { IController } from './IController';

export class DiscountController implements IController {
  public basePath = '/api/v1';
  public router = express.Router();
  private readonly _discountRepository: DiscountRepository;
  constructor() {
    this._discountRepository = new DiscountRepository();
    this.initRoutes();
  }
  initRoutes() {
    this.router.get(
      `${this.basePath}/GetDiscount/:productName`,
      this.GetDiscount.bind(this)
    );
    this.router.post(
      `${this.basePath}/CreateDiscount`,
      this.CreateDiscount.bind(this)
    );
    this.router.put(
      `${this.basePath}/UpdateDiscount`,
      this.UpdateDiscount.bind(this)
    );
    this.router.delete(
      `${this.basePath}/DeleteDiscount/:productName`,
      this.DeleteDiscount.bind(this)
    );
  }

  public async GetDiscount(req: Request, res: Response): Promise<void> {
    const productName: string = req.params.productName;
    const coupon: Coupon | CouponAttributes =
      await this._discountRepository.getDiscount(productName);
    res.status(200).send(coupon);
  }

  public async CreateDiscount(req: Request, res: Response): Promise<void> {
    const coupon: Coupon = req.body;
    await this._discountRepository.createDiscount(coupon);
    res.status(201).send(coupon);
  }

  public async UpdateDiscount(req: Request, res: Response): Promise<void> {
    const coupon: Coupon = req.body;
    const success: boolean = await this._discountRepository.updateDiscount(
      coupon
    );
    res.status(200).send(success);
  }

  public async DeleteDiscount(req: Request, res: Response): Promise<void> {
    const productName: string = req.params.productName;
    const success: boolean = await this._discountRepository.deleteDiscount(
      productName
    );
    res.status(200).send(success);
  }
}
