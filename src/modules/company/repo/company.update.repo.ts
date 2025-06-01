/**
 * Update
 *
 * Service method to update an existing company's details.
 *
 * @param {ICompanyUpdate} params
 *   - `documentId` (string): Unique company document identifier.
 *   - `logoUrl` (string): URL of the company's logo.
 *   - `name` (string): Company name.
 *   - `companyType` (string): Type/category of the company.
 * @returns {Promise<ICompanyUpdateDto>}
 *   - Resolves with the updated company record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */


import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { ICompanyUpdate, ICompanyUpdateDto } from "../interface/company.update.interface";

export const update = async ({
  logoUrl,
  name,
  documentId,
  companyType
}: ICompanyUpdate): Promise<ICompanyUpdateDto> => {
  try {
    const company = await database.company.update({
      where: {
        documentId
      },
      data: {
        logoUrl,
        name,
        documentId,
        companyType
      }
    })

    return company;
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
};