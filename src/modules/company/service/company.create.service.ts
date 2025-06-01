/**
 * create
 *
 * Service method to create a new company if it does not already exist.
 *
 * @param {ICompanyCreate} params
 *   - `documentId` (string): Unique company document identifier.
 *   - `name` (string): Company name.
 *   - `companyType` (string): Type/category of the company.
 * @returns {Promise<ICompanyCreateDto | Error>}
 *   - Resolves with `ICompanyCreateDto` on successful creation.
 *   - Returns `Error(MessageMap.ERROR.MODULE.COMPANY.SERVICE.ALREADY_EXISTS)` if a company with the same documentId already exists.
 * @throws {Error}
 *   - Throws `MessageMap.ERROR.MODULE.DATABASE` on any database failure during creation.
 */

import { MessageMap } from "../../../shared/messages";
import { ICompanyCreate, ICompanyCreateDto } from "../interface/company.create.interface";
import { companyRepository } from "../repo/company.repo";
import { get } from "../repo/company.get.repo";

export const create = async ({
  documentId,
  name,
  companyType
}: ICompanyCreate): Promise<ICompanyCreateDto> => {

  const companyExists = await get({ documentId });
  if (companyExists) {
    return new Error(MessageMap.ERROR.MODULE.COMPANY.SERVICE.ALREADY_EXISTS);
  }

  return await companyRepository.create({
    documentId,
    companyType,
    name,
  });
}