import Router from "express";
import { SkillService } from "../services/skillService";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { ifElseAdminMiddleware } from "../middlewares/ifElseAdminMiddleware";

export const skillRouter = Router();

skillRouter.use(Router.json());

const skill = new SkillService();

skillRouter.get(
    "/",
    [authenticateJWT(false)],
    ifElseAdminMiddleware(skill.getPublic, skill.get)
);
skillRouter.post("/", [authenticateJWT()], skill.create);
skillRouter.put("/:id", [authenticateJWT()], skill.update);
skillRouter.delete("/:id", [authenticateJWT()], skill.delete);
