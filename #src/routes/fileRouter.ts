import Router from "express";
import { FileService } from "../services/fileService";
import fileUpload from "express-fileupload";
import { authenticateJWT } from "../middlewares/authMiddleware";
export const fileRouter = Router();

fileRouter.use(Router.json());

const file = new FileService();

fileRouter.use(fileUpload({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));

fileRouter.post("/", [authenticateJWT()], file.upload);
fileRouter.get("/:file", [], file.get);