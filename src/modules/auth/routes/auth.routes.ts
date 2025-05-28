import express, { Request, Response } from "express";
import { celebrate } from "celebrate";
import { authController } from "../controller/auth.controller";
import { authSchema } from "../schema/auth.schema";

const authRouter = express.Router();

authRouter.get(
  "/auth/login",
  celebrate(authSchema.login()),
  async (req: Request, res: Response) => {
    await authController.login(req, res);
  }
);

export default authRouter;
