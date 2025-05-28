/**
 * PlanController
 * 
 * Handles HTTP requests related to company subscription plans.
 * 
 * Methods:
 * - register(request, response): Registers a new plan for a company using PlanService.
 *   => Expects companyId and licenseName in the request body.
 *   => Returns the created plan on success.
 *   => Returns HTTP 400 with an error message on failure.
 * 
 * - get(request, response): Retrieves the plan for a given company using PlanService.
 *   => Expects companyId in the request body.
 *   => Returns the plan if found.
 *   => Returns HTTP 400 with an error message on failure.
 */

import { Request, Response } from "express";
import { LicenseService } from "../service/license.service";

export class LicenseController {
  private licenseService = new LicenseService();

  async get(
    request: Request,
    response: Response
  ) {
    try {
      const resqData = request.body;
      const licenseId = resqData.licenseId;
      const newCompany = await this.licenseService.get(licenseId);

      return newCompany;
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}