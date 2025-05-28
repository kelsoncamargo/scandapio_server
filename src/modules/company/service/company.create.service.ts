/**
 * @module service.company
 * @description Creates a new company record after ensuring no existing company has the same document ID.
 *
 * @function create
 * @param {import("../interface/company.create.interface").IRegisterCompany} data – Object containing:
 *   - documentId (string): Unique company document identifier.
 *   - name (string): Company name.
 *   - companyType (string): Type/category of the company.
 * @returns {Promise<import("../interface/company.create.interface").IRegisterCompanyDto>}
 *   Resolves with the registration result DTO.
 * @throws {Error}
 *   Throws `MessageMap.ERROR.MODULE.COMPANY.SERVICE.ALREADY_DOCUMENT` if a company with the given document ID already exists.
 */

import { MessageMap } from "../../../shared/messages";
import { IRegisterCompany, IRegisterCompanyDto } from "../interface/company.create.interface";
import { companyRepository } from "../repo/company.repo";
import { get } from "../repo/company.get.repo";

export const create = async ({
  documentId,
  name,
  companyType
}: IRegisterCompany): Promise<IRegisterCompanyDto> => {

  const companyExists = await get(documentId);
  if (companyExists) {
    return new Error(MessageMap.ERROR.MODULE.COMPANY.SERVICE.ALREADY_DOCUMENT);
  }

  return await companyRepository.create({
    documentId,
    companyType,
    name,
  });
}