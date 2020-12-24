import ProductFetchController from "./controller/products.fetch.controller";
import ProductCreateController from "./controller/products.create.controller";
import Authorization from "../../common/authorization/authorization"

export class ProductRoutes {
    public initialize(app: any, baseUrl: string): void {
        const productFetchController = new ProductFetchController(),
            productCreateController = new ProductCreateController(),
            authorization = new Authorization();

        app.route(baseUrl + "/products")
            .get(authorization.authUser, productFetchController.fetch)
            .post(authorization.authUser, productCreateController.create)
    }
}
