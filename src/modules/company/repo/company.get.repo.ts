/**
 * @module repository.company
 * @description Retrieves a company record by its document ID.
 *
 * @function get
 * @param {string} documentId – Unique company document identifier.
 * @returns {Promise<object>} Resolves with the full company record object.
 * @throws {Error}
 *   - MessageMap.ERROR.MODULE.COMPANY.REPO.NOT_COMPANY if no matching company is found.  
 *   - MessageMap.ERROR.MODULE.DATABASE on any database error.
 */


import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";

export const get = async (documentId: string): Promise<object | null> => {
  try {
    const company = await database.company.findFirst({
      where: {
        documentId
      }
    });

    return company
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE + " " + err);
  }
}