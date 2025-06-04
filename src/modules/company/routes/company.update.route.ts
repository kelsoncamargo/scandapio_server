import express, { NextFunction, Request, Response } from "express";
import { companyController } from "../controller/company.controller";
import { authenticate } from "../../../middlewares/auth/middleware/auth.middleware";
import { requireCompanyActiveOrOwner } from "../../../middlewares/company/companyActiveOrOwner.middleware";
import { authorize } from "../../../middlewares/authorize/authorize.middleware";

const companyUpdateRouter = express.Router();

companyUpdateRouter.get(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActiveOrOwner(req, res, next);
  },

  authorize("company:*"),

  async (req: Request, res: Response) => {
    await companyController.update(req, res);
  },
);

export default companyUpdateRouter;
