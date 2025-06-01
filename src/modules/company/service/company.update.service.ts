/**
 * update
 *
 * Service method to update a company’s details, using existing values when fields are omitted.
 *
 * @param {ICompanyUpdate} params
 *   - `documentId` (string): Current unique company document identifier.
 *   - `name` (string | undefined): New company name (optional).
 *   - `companyType` (string | undefined): New company type/category (optional).
 *   - `logoUrl` (string | undefined): New logo URL (optional).
 *   - `newDocumentId` (string | undefined): New documentId if renaming (optional).
 * @returns {Promise<ICompanyUpdateDto | Error>}
 *   - Resolves with the updated company record.
 *   - Returns `Error(MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND)` if no existing company is found.
 * @throws {Error}
 *   - Throws `MessageMap.ERROR.MODULE.DATABASE` on any database failure during update.
 */

import { MessageMap } from "../../../shared/messages";
import { ICompanyUpdate, ICompanyUpdateDto } from "../interface/company.update.interface";
import { companyService } from "./company.service";
import { update as updateRepo } from "../repo/company.update.repo"
import { ICompanyGetDto } from "../interface/company.get.interface";

export const update = async ({
  documentId,
  name,
  companyType,
  logoUrl,
  newDocumentId
}: ICompanyUpdate): Promise<ICompanyUpdateDto | Error> => {
  const company: ICompanyGetDto = await companyService.get({ documentId });

  if (!company) {
    return new Error(MessageMap.ERROR.MODULE.COMPANY.NOT_FOUND);
  }

  return await updateRepo({
    documentId: newDocumentId ?? company.documentId,
    companyType: companyType ?? company.companyType,
    name: name ?? company.name,
    logoUrl: logoUrl ?? company.logoUrl
  });
}