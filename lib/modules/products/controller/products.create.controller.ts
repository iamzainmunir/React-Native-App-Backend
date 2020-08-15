import { Request, Response } from "express";

import errorHandler from "../../../common/handler/error.handler";
import ProductModel from "../products.model";

const fs = require("fs");
const cloudinary = require("cloudinary").v2;

interface IRequest extends Request {
  files: any;
}
export default class ProductCreateController {
  public create = async (req: IRequest, res: Response) => {
    try {
      let image_url: any = [];
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      });

      if (req.files.image1) {
        const image_upload: any = await upload(req.files.image1.tempFilePath);
        if(!image_upload) throw image_upload;

        image_url.push({ url: image_upload.url })
      }

      if (req.files.image2) {
        const image_upload: any = await upload(req.files.image2.tempFilePath);
        if(!image_upload) throw image_upload;

        image_url.push({ url: image_upload.url })
      }


      if (req.files.image3) {
        const image_upload: any = await upload(req.files.image3.tempFilePath);
        if(!image_upload) throw image_upload;

        image_url.push({ url: image_upload.url })
      }


      if (req.files.image4) {
        const image_upload: any = await upload(req.files.image4.tempFilePath);
        if(!image_upload) throw image_upload;

        image_url.push({ url: image_upload.url })
      }


      if (req.files.image5) {
        const image_upload: any = await upload(req.files.image5.tempFilePath);
        if(!image_upload) throw image_upload;

        image_url.push({ url: image_upload.url })
      }
      
      const createProduct: any = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_url,
      }

      if(req.body.latitude && req.body.longitude) 
      {
        createProduct.location = {
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      }

      const product = await ProductModel.create(createProduct);

      return res.status(200).send({
        //data: product,
        success: true,
        message: "Product added successfully !"
      });

    } catch (error) {
      let errorDoc = errorHandler(error);
      return res.status(errorDoc.status).send(errorDoc);
    }
  };
}

async function upload(FILE_PATH: string){
  try {
    const image_upload = await cloudinary.uploader.upload(FILE_PATH);

    fs.unlink(FILE_PATH, (err: any) => {
      if (err) {
        throw err;
      }
    })

    return image_upload;
  } catch (error) {
    return error
  }
}
