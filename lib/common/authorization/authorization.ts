import { Request, Response, NextFunction } from 'express';
import errorHandler from "../handler/error.handler";
const requireDataValidate = require("../validation/require.validation");

interface IRequest extends Request{
    user: any
}
export default class Authorization {
    public authUser = async (req: IRequest, res: Response, next: NextFunction) => {
        let required_fields = [{
            key: 'token',
            type: 'string'
        },{
            key: 'username',
            type: 'string',
        },{
            key: 'school_id',
            type: 'mongoose-object-id'
        },{
            key: 'user_id',
            type: 'mongoose-object-id',
        }],
        requestBody = {
            token: req.headers['token'],
            username: req.headers['username'],
            school_id: req.headers['school_id'],
            user_id: req.headers['user_id']
        };

        try{
            let validate = requireDataValidate(required_fields, requestBody);
            if(validate.error){
                throw {
                    status: 400,
                    message: validate.message
                }
            }

            req.user = validate.data;
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