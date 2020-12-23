import { ProductRoutes } from "./products/products.route";
import { UserRoutes } from "./user/user.routes";

export default class Routes {
  public initializeRoutes = (app: any) => {
    /*
     * All the modules routes should be initialize here
     */

    let productRoutes = new ProductRoutes(),
    userRoutes = new UserRoutes();

    productRoutes.initialize(app, this.BASEURL);
    userRoutes.initialize(app, this.BASEURL);
  };

  private BASEURL: string = "/api/v1";
}
