/**
 * suspend
 *
 * Service method to suspend a company by its document ID.
 *
 * @param {ICompanySuspend} params
 *   - `documentId` (string): Unique company document identifier.
 * @returns {Promise<ICompanySuspendDto>}
 *   - Resolves with `{ message: string }` containing:
 *     MessageMap.SUCCESS.MODULE.COMPANY.REPO.SUSPEND.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { ICompanySuspend, ICompanySuspendDto } from "../interface/company.suspend.interface";

export const suspend = async ({ documentId }: ICompanySuspend): Promise<ICompanySuspendDto> => {
  try {
    await database.company.update({
      where: {
        documentId
      },
      data: {
        isActive: "SUSPENDED"
      }
    });

    return { message: MessageMap.SUCCESS.MODULE.COMPANY.REPO.SUSPEND };
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
}