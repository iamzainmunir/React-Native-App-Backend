import { Request, Response, NextFunction } from 'express';
import errorHandler from "../handler/error.handler";
const requireDataValidate = require("../validation/require.validation");
const jwt = require('jsonwebtoken');


interface IRequest extends Request{
    user: any
}
export default class Authorization {
    public authUser = async (req: IRequest, res: Response, next: NextFunction) => {
        try{
            if(!req.headers["x-auth-token"]){
                throw{
                    status: 401,
                    message: "You are not allowed to access this api"
                }
            }
            const decodeUser = jwt.verify(req.headers["x-auth-token"], process.env.JWT_SECRET)
            req.user = decodeUser;
            next();
        }
        catch(err){
            let error = err;
            if(error.statusCode){
                error = errorHandler({name: 'third-party-service-error', ...error.error})
            }else{
                error = errorHandler(error);
            }
            return res.status(error.status).send(error);
        }

       
    }
}