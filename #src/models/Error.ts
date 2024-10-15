import { Response } from "express";

export function authError(res: Response) {
    errorSend( res, { authorize: "Требуется авторизация!", }, { code: 401 } );
};

export function dbError(res: Response, slag: string = "#777!") {
    errorSend( res, { db: `Ошибка базы данных ${slag}`}, { code: 500 } );
}

export function errorSend(
    res: Response,
    data: any,
    options: { code: number } = { code: 400 }
) {
    res.status(options.code).json({ errors: data });
}

export function logInErrorSend(res: Response,) {
    errorSend(res, {errors: {auth: 'Некорректный логин или пароль'}}, {code: 401})
}