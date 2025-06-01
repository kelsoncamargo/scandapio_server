/**
 * CompanyRouter
 *
 * Aggregates company-related sub-routers.
 *
 * @middleware /create – Routes for company registration (companyCreateRouter).
 * @middleware /get    – Routes for retrieving company details (companyGetRouter).
 */


import express from "express";
import companyGetRouter from "./company.get.route";
import companyCreateRouter from "./company.create";


const companyRouter = express.Router();

companyRouter.use("/", companyCreateRouter);

companyRouter.use("/", companyGetRouter);

export default companyRouter;
