import express, { Request, Response } from "express";

import routerCompany from "./routes/routes.company";

const userRouter = express.Router();

userRouter.use("/", routerCompany);

export default userRouter;
