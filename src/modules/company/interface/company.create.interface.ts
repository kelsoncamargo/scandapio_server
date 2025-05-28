import { CompanyType } from "@prisma/client";

export interface IRegisterCompany {
  name: string;
  documentId: string;
  companyType: CompanyType;
}

export interface IRegisterCompanyDto {
  message: string;
}