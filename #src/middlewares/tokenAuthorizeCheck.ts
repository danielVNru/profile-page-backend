import { NextFunction, Request, Response } from "express";
import { authError } from "../models/errorModels";
import { dbQuery } from "../models/dbModel";

export async function tokenAuthorizeCheck (req: Request, res: Response, next: NextFunction) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1];
        const timestamp = new Date().getTime() - 96 * 60 * 60 * 1000;

        const [users] = await dbQuery(
            `/* SQL */ 
            SELECT 
            a.*
            FROM accounts a
            LEFT JOIN tokens t ON a.id = t.account_id 
            WHERE t.token=$1 AND t.timestamp>$2`,
            [token, timestamp]
        );

        if (users === null) return authError(res);

        req.user = users?.rows[0] ?? {};

        return next();
    }
};
