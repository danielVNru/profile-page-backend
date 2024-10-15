import Router from "express";
import { UserService } from "../services/userService";

export const userRouter = Router();

userRouter.use(Router.json());

const user = new UserService();

userRouter.post("/login", [], user.login);
userRouter.post("/register", [], user.register);
userRouter.post("/refresh", [], user.refresh);
userRouter.post("/logout", [], user.logout);
