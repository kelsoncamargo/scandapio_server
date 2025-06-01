/**
 * CompanySchema
 *
 * Encapsulates Joi validation schemas for company-related HTTP routes.
 *
 * @method create
 *   – Validation schema for the registration endpoint.
 * @method get
 *   – Validation schema for the retrieval endpoint.
 * @method update
 *   – Validation schema for the update endpoint.
 * @method suspend
 *   – Validation schema for the suspension endpoint.
 */


import { create } from "./company.create.schema";
import { update } from "./company.update.schema";

class CompanySchema {
  create = create;
  update = update;
}

export const companySchema = new CompanySchema();