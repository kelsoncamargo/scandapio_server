import express from "express";
import userRouter from "./user/user.routes";
import companyRouter from "./company/routes/company.routes";


const moduleRouter = express.Router();

moduleRouter.use("/", companyRouter);

moduleRouter.use("/", userRouter);

export default moduleRouter;
