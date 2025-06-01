/**
 * companyCreateRouter
 *
 * @module routes.companyCreate
 * @description Handles the full flow for company registration:
 *              1) Validates company data and creates a new company.
 *              2) Sets the new user’s role to OWNER, validates user data, and creates the initial user.
 *              3) Validates login data and delegates to authController.login to issue tokens.
 *
 * @route POST /create
 * @returns {void} Responds via authController.login on successful registration and login.
 * @throws {400 Bad Request} If any validation step fails (celebrate will handle and return 400).
 */


import express, { NextFunction, Request, Response } from "express";
import { celebrate } from "celebrate";
import { create as companyCreate } from "../service/company.create.service";
import { companySchema } from "../schema/company.schema";
import { userSchema } from "../../user/schema/user.schema";
import { create as userCreate } from "../../user/service/user.create.service";
import { authSchema } from "../../auth/schema/auth.schema";
import { authController } from "../../auth/controller/auth.controller";
import { Role } from "@prisma/client";

const companyCreateRouter = express.Router();

companyCreateRouter.post(
  "/create",
  celebrate(companySchema.create()),
  async (req: Request, res: Response, next: NextFunction) => {
    const reqData = req.body;

    const userData = {
      name: reqData.name,
      documentId: reqData.documentId,
      companyType: reqData.companyType
    };

    req.body = { ...req.body, role: Role.OWNER }

    await companyCreate(userData);

    next();
  },

  celebrate(userSchema.create()),
  async (req: Request, res: Response, next: NextFunction) => {
    const reqData = req.body;

    const userData = {
      name: reqData.name,
      documentId: reqData.documentId,
      email: reqData.email,
      password: reqData.password,
      role: reqData.role
    };

    await userCreate(userData)

    next();
  },

  celebrate(authSchema.login()),
  async (req: Request, res: Response) => {
    await authController.login(req, res)
  },
);

export default companyCreateRouter;
