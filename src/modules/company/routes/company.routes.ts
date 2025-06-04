/**
 * CompanyRouter
 *
 * Aggregates company-related sub-routers.
 *
 * @middleware "/create" – Mounts routes for company registration (companyCreateRouter).
 * @middleware "/get"    – Mounts routes for retrieving company details (companyGetRouter).
 * @middleware "/update" – Mounts routes for updating company details (companyUpdateRouter).
 */


import express from "express";
import companyGetRouter from "./company.get.route";
import companyCreateRouter from "./company.create";
import companyUpdateRouter from "./company.update.route";


const companyRouter = express.Router();

companyRouter.use("/", companyCreateRouter);

companyRouter.use("/", companyGetRouter);

companyRouter.use("/", companyUpdateRouter);


export default companyRouter;
