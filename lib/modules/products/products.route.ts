import ProductFetchController from "./controller/products.fetch.controller";
import ProductCreateController from "./controller/products.create.controller";

export class ProductRoutes {
    public initialize(app: any, baseUrl: string): void {
        const productFetchController = new ProductFetchController(),
            productCreateController = new ProductCreateController();

        app.route(baseUrl + "/products")
            .get(productFetchController.fetch)
            .post(productCreateController.create)
    }
}
