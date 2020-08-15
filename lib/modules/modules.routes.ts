import { ProductRoutes } from "./products/products.route";

export default class Routes {
  public initializeRoutes = (app: any) => {
    /*
     * All the modules routes should be initialize here
     */

    let productRoutes = new ProductRoutes();

    productRoutes.initialize(app, this.BASEURL);
  };

  private BASEURL: string = "/api/v1";
}
