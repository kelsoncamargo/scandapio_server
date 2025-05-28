/**
 * AuthRouter
 * 
 * Express router responsible for authentication-related endpoints, specifically company and initial user registration.
 * 
 * Endpoints:
 * 
 * - POST /register/company
 *   => Validates request body using celebrate with SchemaCompany.
 *   => Calls ControllerCompany.register to handle the registration logic.
 * 
 * Middlewares:
 * - celebrate(schemaCompany.register): Validates the incoming request body against the defined Joi schema.
 * 
 */

import express, { NextFunction, Request, Response } from "express";
import { celebrate } from "celebrate";
import { create as companyCreate } from "../service/company.create.service";
import { companySchema } from "../schema/company.schema";
import { userSchema } from "../../user/schema/user.schema";
import { create as userCreate } from "../../user/service/user.create.service";
import { companyController } from "../controller/company.controller";
import { authSchema } from "../../auth/schema/auth.schema";
import { authController } from "../../auth/controller/auth.controller";
import { Role } from "@prisma/client";

const companyRouter = express.Router();

companyRouter.post(
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

companyRouter.get(
  "/get",
  celebrate(companySchema.get()),
  async (req: Request, res: Response) => {
    await companyController.get(req, res);
  },
);

export default companyRouter;
