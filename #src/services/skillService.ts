import { Request, Response } from "express";
import { ReqWithBody, ReqWithParams } from "../baseTypes";
import SkillModel from "../models/Skill";
import { wrap } from "../utils/wrap";
import { dbError } from "../models/Error";

export class SkillService {
    async get(req: Request, res: Response) {
        const [skills] = await wrap(
            SkillModel.findAll({
                where: { delete: false },
                order: [["createdAt", "DESC"]],
            })
        );
        
        if (!skills) return dbError(res, "#2006");

        res.json(skills);
    }

    async getPublic(req: Request, res: Response) {
        const [skills] = await wrap(
            SkillModel.findAll({
                where: { public: true, delete: false },
                order: [["createdAt", "DESC"]],
            })
        );

        if (!skills) return dbError(res, "#2006");

        res.json(skills);
    }

    async create(req: ReqWithBody<SkillModel>, res: Response) {
        const { ico, skill, desc } = req.body;

        const [result, err] = await wrap(
            SkillModel.create({ ico, skill, desc }, { returning: true })
        );

        if (err !== null) return dbError(res, "#2001");

        res.status(201).json(result);
    }

    async update(
        req: ReqWithParams<{ id: string }> & ReqWithBody<SkillModel>,
        res: Response
    ) {
        const { ico, skill, desc, public: p } = req.body;

        const { id } = req.params;

        const [skillResult, getError] = await wrap(SkillModel.findByPk(id));

        if (getError) return dbError(res, "#2002");
        if (!skillResult) {
            res.status(404).json({ skill: "not found" });
            return;
        }

        const [result, err] = await wrap(
            skillResult.update({ ico, skill, desc, public: p })
        );

        if (err) return dbError(res, "#2005");

        res.status(201).json(skillResult);
    }

    async delete(req: ReqWithParams<{ id: string }>, res: Response) {
        const { id } = req.params;

        const [skillResult, getError] = await wrap(SkillModel.findByPk(id));

        if (getError) return dbError(res, "#2003");
        if (!skillResult) {
            res.status(404).json({ skill: "not found" });
            return;
        }

        const [result, err] = await wrap(skillResult.update({ delete: true }));

        if (err) return dbError(res, "#2004");

        res.status(204).json();
    }
}
