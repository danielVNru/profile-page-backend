import { Request, Response, NextFunction } from "express";

export function ifElseAdminMiddleware(common: Function, admin: Function){
    return function (
        req: Request,
        res: Response
    ) {
        if (!req.payload) return common(req, res)
            else admin(req, res)
    }
}
