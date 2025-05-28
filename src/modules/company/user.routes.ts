import express from "express";

import routerCompany from "./routes/company.routes";

const comapnyRouter = express.Router();

comapnyRouter.use("/", routerCompany);

export default comapnyRouter;
