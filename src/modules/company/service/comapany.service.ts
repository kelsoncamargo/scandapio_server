/**
 * @module service.company
 * @description Service class responsible for company business operations by delegating to specialized services.
 *
 * @function create
 * @description Registers a new company by invoking `company.create.service`.
 *
 * @function get
 * @description Retrieves an existing company’s details by invoking `company.get.service`.
 */


import { create } from "./company.create.service";
import { get } from "./company.get.service";

class CompanyService {
  create = create;
  get = get;
}

export const companyService = new CompanyService();