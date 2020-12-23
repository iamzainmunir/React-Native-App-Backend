import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import errorHandler from "../../../common/handler/error.handler";
import UserModel from "../user.model";

interface IRequest extends Request {
  user: any;
}
export default class UserRegisterController {
  public create = async (req: IRequest, res: Response) => {
    try {

      console.log(process.env.BCRYPTJS_SALT)
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      const fetchUser: any = await UserModel.findOne({ email: req.body.email })
      if (fetchUser) {
        throw {
          status: 400,
          message: "User already exist"
        }
      }

      const registerUserBody = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }

      const registerUser: any = await UserModel.create(registerUserBody);
      if (registerUser) {
        const token = jwt.sign({ uid: registerUser._id, name: registerUser.name, email: registerUser.email }, process.env.JWT_SECRET);

        return res.status(200).send({
          token: token,
          success: true,
          message: "User registered successfully !"
        });
      }
    } catch (error) {
      let errorDoc = errorHandler(error);
      return res.status(errorDoc.status).send(errorDoc);
    }
  };
}
