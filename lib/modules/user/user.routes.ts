import RegisterUserController from "./controller/user.register.controller";
import LoginUserController from "./controller/user.login.controller";

export class UserRoutes {
    public initialize(app: any, baseUrl: string): void {
        const registerUserController = new RegisterUserController(),
        loginUserController = new LoginUserController();

        app.route(baseUrl + "/user/register")
            .post(registerUserController.create);

        app.route(baseUrl + "/user/login")
            .post(loginUserController.login)
    }
}
