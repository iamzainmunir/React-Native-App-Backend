import { Request, Response } from "express";

import errorHandler from "../../../common/handler/error.handler";
import ProductModel from "../products.model";

interface IRequest extends Request {
  user: any;
}
export default class ProductFetchController {
  public fetch = async (req: IRequest, res: Response) => {
    try {
      const products = await ProductModel.find().sort({ created_at: -1 });

      return res.status(200).send({
        data: products,
        success: true,
        message: "Products list fetched successfully !"
      });

    } catch (error) {
      let errorDoc = errorHandler(error);
      return res.status(errorDoc.status).send(errorDoc);
    }
  };
}
