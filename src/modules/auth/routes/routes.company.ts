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


import express, { Request, Response } from "express";

import { celebrate } from "celebrate";
import { ControllerCompany } from "../controller/company.controller";
import { SchemaCompany } from "../schema/schema.company";

const routerCompany = express.Router();
const schemaCompany = new SchemaCompany();
const controllerCompany = new ControllerCompany();

routerCompany.post(
  "/register/company",
  celebrate(schemaCompany.register),
  async (req: Request, res: Response,) => {
    await controllerCompany.register(req, res);
  }
);

export default routerCompany;
