import { Request, Response } from "express";
import { saveFileAndReturnInfo } from "../utils/saveFileAndReturnInfo";
import { isNotArray } from "../utils/isNoArray";
import { ReqWithParams } from "../baseTypes";

export class File {
    async upload(req: Request, res: Response) {
        // 
        if (!req.files || Object.keys(req.files).length === 0) return res.json({ee: false})

        const files = Object.values(req.files).filter(isNotArray);
        
        const filePaths: any[] = await Promise.all(
            files.map(saveFileAndReturnInfo)
        );

        const data = filePaths.map(([val]) => val);

        return res.status(200).json({
            files: data,
        });
    }

    async get(req: ReqWithParams<{ file: string }>, res: Response) {
        
        const { file } = req.params;

        return res.sendFile(`${global.uploadDir}/${file}`)
    }
}
