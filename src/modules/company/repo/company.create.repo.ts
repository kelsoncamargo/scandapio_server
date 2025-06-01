/**
 * @module repository.company
 * @description Inserts a new Company record into the database.
 *
 * @param {ICompanyCreate} data
 *   - `documentId` (string): Unique company document identifier.
 *   - `name` (string): Company name.
 *   - `companyType` (string): Type/category of the company.
 * @returns {Promise<ICompanyCreateDto>}
 *   - Resolves with `{ message: string }` containing:
 *     MessageMap.SUCCESS.MODULE.COMPANY.REPO.REGISTER.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { ICompanyCreate, ICompanyCreateDto } from "../interface/company.create.interface";

export const create = async ({
  documentId,
  name,
  companyType,
}: ICompanyCreate): Promise<ICompanyCreateDto> => {
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