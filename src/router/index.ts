import { Router } from "express";
import moduleRouter from "../modules/module.routes";

export const router = Router();

router.use("/company", moduleRouter);

router.use("/user", moduleRouter);

export default router;

