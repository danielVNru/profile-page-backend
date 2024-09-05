import { Response } from "express";

export function authError(res: Response) {
    return errorSend( res, { authorize: "Требуется авторизация!", }, { code: 401 } );
};

export function dbError(res: Response, slag: string = "#777!") {
    return errorSend( res, { db: {
        ru: `Ошибка базы данных ${slag}`,
        en: `Error dataBase ${slag}`,
    } }, { code: 500 } );
}

export function errorSend(
    res: Response,
    data: any,
    options: { code: number } = { code: 400 }
) {
    return res.status(options.code).json({ errors: data });
}

export function logInErrorSend(res: Response,) {
    errorSend(res, {errors: {auth: 'Некорректный логин или пароль'}}, {code: 401})
}