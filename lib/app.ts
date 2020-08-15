import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AppRoute from './modules/modules.routes';
const fileUpload = require("express-fileupload");

const path = require('path');

// Swagger still use old
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

// Initialize dotenv
if(process.env.NODE_ENV === 'production'){
  console.log("Production server is running");
  dotenv.config({path: path.join(__dirname, "../.env.production")});
}else{
  dotenv.config();
}


class App {
  public app: express.Application;
  public routes: AppRoute = new AppRoute();
  private mongoUrl: any = process.env.DATABASE;

  constructor() {
    this.app = express();
    this.config();
    this.routes.initializeRoutes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true  }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "./Uploads"
    }))
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true,  useUnifiedTopology: true  })
    .then((success)=>{
      console.log("Database connected successfully");
    }).catch(error=>{
      console.log("Error", error)
    });
  }
}
export default new App().app;
