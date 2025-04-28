import express, { Request, Response } from "express";

import routerCompany from "./routes/routes.company";

const authRouter = express.Router();

authRouter.post("/", routerCompany);

export default authRouter;
