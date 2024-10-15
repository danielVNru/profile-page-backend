import { Request, Response } from "express";
import { ReqWithBody } from "../baseTypes";
import UserModel from "../models/User";
import { wrap } from "../utils/wrap";
import { dbError, logInErrorSend } from "../models/Error";
import bcrypt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/tokenManager";
import Token from "../models/Token";

type UserPayload = { id: number; username: string };

export class UserService {
    async register(
        req: ReqWithBody<{ username: string; password: string }>,
        res: Response
    ) {
        const { username, password } = req.body;

        try {

            // Хеширование пароля с динамической солью
            const saltRounds = 10; // Вы можете настроить количество раундов
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Создание нового пользователя
            const user = await UserModel.create({
                username,
                password: hashedPassword,
            });

            res.status(201).json({ id: user.id, username: user.username });
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
            res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async login(
        req: ReqWithBody<{ username: string; password: string }>,
        res: Response
    ) {
        const { username, password } = req.body;

        const [user, error] = await wrap(
            UserModel.findOne({ where: { username } })
        );

        if (error !== null) return dbError(res, "#1001");

        if (!user) return logInErrorSend(res);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return logInErrorSend(res);

        const userPayload: UserPayload = {
            id: user.id,
            username: user.username,
        };
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        // Сохранение refreshToken в базе данных
        const [sucess, crError] = await wrap(
            Token.create({ token: refreshToken, userId: user.id })
        );

        if (crError) return dbError(res, "#1002");

        res.json({ accessToken, refreshToken });
    }

    async refresh(req: ReqWithBody<{ token: string }>, res: Response) {
        const { token } = req.body;

        // TODO реализовать обновление токенов
    }

    async logout(req: ReqWithBody<{ token: string }>, res: Response) {
        const { token } = req.body;

        // TODO реализовать отзыв токенов
    }
}
