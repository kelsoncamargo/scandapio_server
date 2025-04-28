import { MessageMap } from "../../../utils/message";
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
      throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
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

      return { message: MessageMap.SUCCESS.COMPANY.SUCESS_MESSAGE.REGISTER };
    } catch (err) {
      throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
    }
  };
}