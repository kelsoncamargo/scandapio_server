/**
 * CompanyRepository
 * 
 * Repository class responsible for managing Company-related database operations.
 * 
 * Methods:
 * 
 * - findCompanyByDocumentId(documentId: string): Promise<true | false>
 *   => Searches for a company by its document ID.
 *   => Returns `true` if the company exists, otherwise `false`.
 *   => Throws an error with MessageMap.ERROR.REPO.DATABASE on failure.
 * 
 * - createCompany({ documentId, name }: IRegisterCompany): Promise<IRegisterCompanyDto>
 *   => Creates a new company record with provided document ID and name.
 *   => Returns a success message defined in MessageMap.SUCCESS.REPO.REGISTER.
 *   => Throws an error with MessageMap.ERROR.REPO.DATABASE on failure.
 *
 */

import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IGetCompanyDto,
  IRegisterCompany,
  IRegisterCompanyDto,
} from "../interface/company.interface";

export class CompanyRepository {
  async createCompany({
    documentId,
    name,
    companyType,
    companyLicenseId
  }: IRegisterCompany): Promise<IRegisterCompanyDto> {
    try {
      await database.company.create({
        data: {
          documentId,
          name,
          companyType,
          companyLicenseId
        },
      });

      return { message: MessageMap.SUCCESS.MODULE.COMPANY.REPO.REGISTER };
    } catch (err) {
      throw new Error(MessageMap.ERROR.MODULE.DATABASE);
    }
  };

  async getCompany(documentId: string): Promise<IGetCompanyDto> {
    try {
      const company = await database.company.findUnique({
        where: { documentId },
        select: {
          id: true,
          name: true,
          companyLicenseId: true,
          documentId: true
        }
      });

      if (!company) {
        throw new Error(MessageMap.ERROR.MODULE.COMPANY.REPO.NOT_COMPANY);
      };

      return {
        id: company.id,
        name: company.name,
        companyLicenseId: company.companyLicenseId,
        documentId: company.documentId
      }
    } catch (err) {
      throw new Error(MessageMap.ERROR.MODULE.DATABASE);
    }
  }
}