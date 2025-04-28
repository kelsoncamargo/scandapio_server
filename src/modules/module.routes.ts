import express, { Request, Response } from "express";
import authRouter from "./auth/auth.routes";


const moduleRouter = express.Router();

moduleRouter.post("/", authRouter);

export default moduleRouter;
