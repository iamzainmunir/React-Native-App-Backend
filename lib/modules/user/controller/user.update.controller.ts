import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import errorHandler from "../../../common/handler/error.handler";
const requireValidate = require("../../../common/validation/require.validation");

import UserModel from "../user.model";

interface IRequest extends Request {
  user: any;
}
export default class UserUpdateController {
  public update = async (req: IRequest, res: Response) => {
      let required_field = [
        {
            key: "notification_token",
            type: "string",
            optional: true 
        }
      ]

      try {
        const validate = await requireValidate(required_field, req.body);
        if (validate.error) {
            throw {
              status: 400,
              message: validate.message,
            };
        }

        const user = await UserModel.findOne({ _id: req.user.uid });
        if(!user){
            throw{
                status: 404,
                message: "No user found"
            }
        }

        let queryObject: any = {};
        if(validate.data.notification_token) queryObject.notification_token = validate.data.notification_token;

        await UserModel.updateOne({ _id: req.user.uid }, {
            $set: queryObject
        })

        return res.status(200).send({
          success: true,
          message: "User updated successfully"
        })
        

    } catch (error) {
      let errorDoc = errorHandler(error);
      return res.status(errorDoc.status).send(errorDoc);
    }
  };
}
