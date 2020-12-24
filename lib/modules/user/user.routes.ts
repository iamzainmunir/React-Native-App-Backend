import RegisterUserController from "./controller/user.register.controller";
import LoginUserController from "./controller/user.login.controller";
import UserUpdateController from "./controller/user.update.controller"
import Authorization from "../../common/authorization/authorization"

export class UserRoutes {
    public initialize(app: any, baseUrl: string): void {
        const registerUserController = new RegisterUserController(),
        loginUserController = new LoginUserController(),
        userUpdateController = new UserUpdateController(),
        authorization = new Authorization();

        app.route(baseUrl + "/user/register")
            .post(registerUserController.create);

        app.route(baseUrl + "/user/login")
            .post(loginUserController.login)

        app.route(baseUrl + "/user/:user_id")
            .put(authorization.authUser, userUpdateController.update)

    }
}
