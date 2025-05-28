/**
 * @module repository.company
 * @description Aggregates persistence operations for company entities by delegating to specialized repository functions.
 *
 * @function create
 * @param {import("../interface/company.interface").ICreatecompany} data – Payload containing details to create a new company.
 * @returns {Promise<import("../interface/company.interface").ICreatecompanyDto>} Resolves with creation result and metadata.
 * @throws {Error} Throws on database failure.
 *
 * @function get
 * @param {string} id – Unique identifier of the company to retrieve.
 * @returns {Promise<import("../interface/company.interface").IGetcompanyDto>} Resolves with company details.
 * @throws {Error} Throws if company not found or on database error.
 */


import { create } from "./company.create.repo";
import { get } from "./company.get.repo";

class CompanyRepository {
  create = create;
  get = get;
}

export const companyRepository = new CompanyRepository();