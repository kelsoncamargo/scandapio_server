import express, { NextFunction, Request, Response } from "express";
import { companyController } from "../controller/company.controller";
import { authenticate } from "../../../middlewares/auth/middleware/auth.middleware";
import { requireCompanyActiveOrOwner } from "../../../middlewares/company/companyActiveOrOwner.middleware";
import { authorize } from "../../../middlewares/authorize/authorize.middleware";

const companySuspendRouter = express.Router();

companySuspendRouter.post(
  "/suspend",
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActiveOrOwner(req, res, next);
  },

  authorize("company:*"),

  async (req: Request, res: Response) => {
    await companyController.suspend(req, res);
  },
);

export default companySuspendRouter;
