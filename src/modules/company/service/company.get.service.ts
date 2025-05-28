/**
 * @module service.company
 * @description Checks for an existing company by document ID and throws if one is already registered; otherwise returns its details.
 *
 * @function get
 * @param {string} documentId – Unique company document identifier.
 * @returns {Promise<import("../interface/company.get.interface").IGetCompanyDto>}  
 *   Resolves with company details when no existing record is found.
 * @throws {Error}  
 *   Throws `MessageMap.ERROR.MODULE.COMPANY.SERVICE.NOT_EXIST` if a company with the given document ID already exists.
 */

import { MessageMap } from "../../../shared/messages";
import { IGetCompanyDto } from "../interface/company.get.interface";
import { companyRepository } from "../repo/company.repo";

export const get = async (
  documentId: string
): Promise<IGetCompanyDto | object> => {
  const company = await companyRepository.get(documentId);

  if (!company) {
    throw new Error(MessageMap.ERROR.MODULE.COMPANY.NOT_COMPANY);
  }

  return company
}