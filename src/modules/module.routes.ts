import express from "express";
import userRouter from "./user/user.routes";


const moduleRouter = express.Router();

moduleRouter.use("/", userRouter);

export default moduleRouter;
