/**
 * suspend
 *
 * Service method to suspend a company by its document ID.
 *
 * @param {ICompanySuspend} params
 *   - `documentId` (string): Unique company document identifier.
 * @returns {Promise<ICompanySuspendDto | Error>}
 *   - Resolves with `ICompanySuspendDto` on successful suspension.
 *   - Returns `Error(MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND)` if no company is found.
 * @throws {Error}
 *   - Throws `MessageMap.ERROR.MODULE.DATABASE` on any database failure during suspension.
 */


import { MessageMap } from "../../../shared/messages";
import { ICompanySuspend, ICompanySuspendDto } from "../interface/company.suspend.interface";
import { companyService } from "./company.service";
import { suspend as suspendRepo } from "../repo/company.suspend.repo"
import { ICompanyGetDto } from "../interface/company.get.interface";

export const suspend = async ({
  documentId
}: ICompanySuspend): Promise<ICompanySuspendDto | Error> => {
  const company: ICompanyGetDto = await companyService.get({ documentId });

  if (!company) {
    return new Error(MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND);
  }

  return await suspendRepo({
    documentId
  });
}