/**
 * @class SchemaCompany
 * @description Encapsulates Joi validation schemas for company-related HTTP routes.
*
* @static
* @property {object} register – Validation mapping for the registration endpoint.
*/

import { create } from "./company.create.schema";
import { get } from "./company.get.schema";

class CompanySchema {
  create = create;
  get = get;
}

export const companySchema = new CompanySchema();