import {
  RegisterCompanyRepository
} from "../repo/company.repo";
import {
  IRegisterCompany,
  IRegisterCompanyDto,
} from "../interface/company.interface";
import { MessageMap } from "../../../utils/message";


export class ServiceCompany {

  private companyRepository = new RegisterCompanyRepository();

  async register({
    documentId,
    companyType,
    name,
  }: IRegisterCompany): Promise<IRegisterCompanyDto> {

    const companyExists = await this.companyRepository.findCompanyByDocumentId(documentId);
    if (companyExists) {
      throw new Error(MessageMap.ERROR.COMPANY.STATUS.REGISTER);
    }

    return await this.companyRepository.createCompany({
      documentId,
      companyType,
      name
    });
  }
}