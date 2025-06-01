/**
 * get
 *
 * Service method to retrieve a company by its document ID.
 *
 * @param {string} documentId                    - Unique company document identifier.
 * @returns {Promise<ICompanyGetDto>}            - Resolves with the company data.
 * @throws {Error}                              - Throws MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND if no company is found.
 */


import { MessageMap } from "../../../shared/messages";
import { ICompanyGet, ICompanyGetDto } from "../interface/company.get.interface";
import { companyRepository } from "../repo/company.repo";

export const get = async ({
  documentId
}: ICompanyGet): Promise<ICompanyGetDto> => {
  const company = await companyRepository.get({ documentId });

  if (!company) {
    throw new Error(MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND);
  }

  return company
}