/**
 * ServiceCompany
 * 
 * Service class responsible for handling business logic related to Company registration.
 * 
 * Methods:
 * 
 * - register({ documentId, companyType, name }: IRegisterCompany): Promise<IRegisterCompanyDto>
 *   => Checks if a company with the given document ID already exists.
 *   => If it exists, throws an error (MessageMap.ERROR.REPO.REGISTER.ALREADY.COMPANY).
 *   => If it does not exist, creates a new company using CompanyRepository.
 * 
 */

import {
  CompanyRepository
} from "../repo/company.repo";
import {
  IRegisterCompany,
  IRegisterCompanyDto,
} from "../interface/company.interface";
import { MessageMap } from "../../../shared/messages";


export class ServiceCompany {

  private companyRepository = new CompanyRepository();

  async register({
    documentId,
    companyType,
    name,
  }: IRegisterCompany): Promise<IRegisterCompanyDto> {

    const companyExists = await this.companyRepository.findCompanyByDocumentId(documentId);
    if (companyExists) {
      throw new Error(MessageMap.ERROR.REPO.REGISTER.ALREADY.COMPANY);
    }

    return await this.companyRepository.createCompany({
      documentId,
      companyType,
      name
    });
  }
}