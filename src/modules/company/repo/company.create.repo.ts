/**
 * @module repository.company
 * @description Inserts a new Company record into the database and returns a registration result.
 *
 * @function create
 * @param {import("../interface/company.interface").IRegisterCompany} data –  
 *   Object containing:
 *   - `documentId` (string): unique company document identifier  
 *   - `name` (string): company name  
 *   - `companyType` (string): type/category of the company  
 *   - `companyLicenseId` (string): associated license ID  
 *
 * @returns {Promise<import("../interface/company.interface").IRegisterCompanyDto>}  
 *   Resolves with `{ message: string }` using `MessageMap.SUCCESS.MODULE.COMPANY.REPO.REGISTER`.
 *
 * @throws {Error}  
 *   Throws `MessageMap.ERROR.MODULE.DATABASE` on any database failure.
 */

import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { IRegisterCompany, IRegisterCompanyDto } from "../interface/company.create.interface";

export const create = async ({
  documentId,
  name,
  companyType,
}: IRegisterCompany): Promise<IRegisterCompanyDto> => {
  try {
    await database.company.create({
      data: {
        documentId,
        name,
        companyType,
      },
    });

    return { message: MessageMap.SUCCESS.MODULE.COMPANY.REPO.REGISTER };
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
};