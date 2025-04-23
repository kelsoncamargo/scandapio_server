import express, { Request, Response } from "express";

import { celebrate } from "celebrate";
import { middlewares } from "../../controller/middlewares";
import { registerCompanyController, registerUserController } from "./auth.controller";
import { SchameRegisterCompany, SchameRegisterUser } from "./auth.schema";

const authRouter = express.Router();

authRouter.post(
  "/register/company",
  celebrate(SchameRegisterCompany),
  (req: Request, res: Response,) => {
    registerCompanyController(req, res);
  }
);


authRouter.post(
  "/register/user",
  middlewares,
  celebrate(SchameRegisterUser),
  (req: Request, res: Response,) => {
    registerUserController(req, res);
  }
);

export default authRouter;
