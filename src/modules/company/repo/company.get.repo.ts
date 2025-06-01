/**
 * @module repository.company
 * @description Retrieves a company record by its document ID.
 *
 * @param {ICompanyGet} params               - Object containing:
 *                                            • documentId: Unique company document identifier.
 * @returns {Promise<ICompanyGetDtoOrNull>}  - Resolves with the company record object or null if not found.
 * @throws {Error}                           - On any database error:
 *                                              MessageMap.ERROR.MODULE.DATABASE
 */

import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { ICompanyGet, ICompanyGetDtoOrNull } from "../interface/company.get.interface";

export const get = async ({ documentId }: ICompanyGet): Promise<ICompanyGetDtoOrNull> => {
  try {
    const company = await database.company.findUnique({
      where: {
        documentId
      }
    });

    return company
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
}