/**
 * @module controller.company
 * @description Provides HTTP endpoints for company operations.
 *
 * @function create
 * @description Handles company registration requests.
 *
 * @function get
 * @description Handles company retrieval requests by document ID.
 */

import { create } from "./company.create.controller";
import { get } from "./company.get.controller";

export class CompanyController {
  create = create;
  get = get;
}

export const companyController = new CompanyController();