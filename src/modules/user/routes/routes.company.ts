import express, { Request, Response } from "express";

import { celebrate } from "celebrate";
import { userController } from "../controller/user.controller";
import { userSchema } from "../schema/user.schema";

const routerCompany = express.Router();

routerCompany.post(
  "/user/create",
  celebrate(userSchema.create()),
  async (req: Request, res: Response,) => {
    await userController.create(req, res);
  }
);

routerCompany.get(
  "/user/get",
  celebrate(userSchema.get()),
  async (req: Request, res: Response,) => {
    await userController.get(req, res);
  }
);

export default routerCompany;
