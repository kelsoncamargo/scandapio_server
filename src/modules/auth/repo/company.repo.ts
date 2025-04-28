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
  IRegisterCompany,
  IRegisterCompanyDto,
} from "../interface/company.interface";

export class CompanyRepository {
  async findCompanyByDocumentId(documentId: string): Promise<true | false> {
    try {
      const company = await database.company.findUnique({
        where: { documentId }
      })

      return company ? true : false;
    } catch (err) {
      throw new Error(MessageMap.ERROR.REPO.DATABASE);
    }
  }

  async createCompany({
    documentId,
    name
  }: IRegisterCompany): Promise<IRegisterCompanyDto> {
    try {
      await database.company.create({
        data: {
          documentId,
          name
        },
      });

      return { message: MessageMap.SUCCESS.REPO.REGISTER };
    } catch (err) {
      throw new Error(MessageMap.ERROR.REPO.DATABASE);
    }
  };
}