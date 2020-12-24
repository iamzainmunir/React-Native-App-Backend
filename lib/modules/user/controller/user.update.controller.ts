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
            key: "user_id",
            type: "mongoose-object-id",
        },
        {
            key: "notification_token",
            type: "string"
        }
      ],
      reqBody = { ...req.params, ...req.body }
    try {
        const validate = await requireValidate(required_field, reqBody);
        if (validate.error) {
            throw {
              status: 400,
              message: validate.message,
            };
        }

        const user = await UserModel.findOne({ _id: validate.data.user_id });
        if(!user){
            throw{
                status: 404,
                message: "No user found"
            }
        }

        await UserModel.updateOne({ _id: validate.data.user_id }, {
            $set: { notification_token: validate.data.notification_token }
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
