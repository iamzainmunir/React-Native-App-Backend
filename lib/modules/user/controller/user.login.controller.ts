import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import errorHandler from "../../../common/handler/error.handler";
import UserModel from "../user.model";

interface IRequest extends Request {
  user: any;
}
export default class UserLoginController {
  public login = async (req: IRequest, res: Response) => {
    try {
      const fetchUser: any = await UserModel.findOne({ email: req.body.email });
      if (fetchUser) {
        const isPasswordValid = bcrypt.compareSync(req.body.password, fetchUser.password);

        if (!isPasswordValid) {
          throw {
            status: 400,
            message: "Invalid email or password"
          }
        }

        const token = jwt.sign({ uid: fetchUser._id, name: fetchUser.name, email: fetchUser.email }, process.env.JWT_SECRET);
        if (token) {
          return res.status(200).send({
            token: token,
            success: true,
            message: "User login successfully !"
          });
        }
      }
      else {
        throw {
          status: 400,
          message: "Invalid email or password"
        }
      }

    } catch (error) {
      let errorDoc = errorHandler(error);
      return res.status(errorDoc.status).send(errorDoc);
    }
  };
}
