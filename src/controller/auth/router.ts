import express, { Request, Response } from "express";

import { celebrate } from "celebrate";
import { loginController } from "./login/controller";
import { schema } from "./schema";
import { tokenController } from "./token/controller";
import { registerController } from "./register/controller";
import { middlewares } from "../middlewares";
import { updateController } from "./update/controller";

const authRouter = express.Router();

authRouter.post(
  "/login",
  celebrate(schema.login),
  (req: Request, res: Response) => {
    loginController(req, res);
  }
);

authRouter.post(
  "/register",
  middlewares,
  celebrate(schema.register),
  (req: Request, res: Response,) => {
    registerController(req, res);
  }
);

authRouter.post(
  "/update/:id",
  celebrate(schema.update),
  (req: Request, res: Response,) => {
    updateController(req, res);
  }
);

authRouter.post(
  "/token/validate",
  celebrate(schema.token),
  (req: Request, res: Response) => {
    tokenController(req, res);
  }
);

export default authRouter;
