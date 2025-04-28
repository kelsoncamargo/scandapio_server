import { Router } from "express";
import moduleRouter from "../modules/module.routes";

export const router = Router();

router.use("/auth", moduleRouter);

export default router;

