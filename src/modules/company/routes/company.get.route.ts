/**
 * CompanyGetRouter
 *
 * Express router for retrieving company details.
 *
 * @route GET /get
 * @middleware authenticate                   – Verifies JWT and populates req.payload.
 * @middleware requireCompanyActiveOrOwner    – Ensures company is ACTIVE or user is OWNER.
 * @middleware authorize("company:read")      – Checks user has permission to read company.
 *
 * @returns {void} Delegates to companyController.get on success.
 * @throws {403} If company is inactive (and user is not OWNER) or lacks permission.
 * @throws {401} If authentication fails.
 * @throws {400} If any middleware validation error occurs.
 */


import express, { NextFunction, Request, Response } from "express";
import { companyController } from "../controller/company.controller";
import { authenticate } from "../../../middlewares/auth/middleware/auth.middleware";
import { requireCompanyActiveOrOwner } from "../../../middlewares/company/companyActiveOrOwner.middleware";
import { authorize } from "../../../middlewares/authorize/authorize.middleware";

const companyGetRouter = express.Router();

companyGetRouter.get(
  "/get",
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActiveOrOwner(req, res, next);
  },

  authorize("company:read"),

  async (req: Request, res: Response) => {
    await companyController.get(req, res);
  },
);

export default companyGetRouter;
