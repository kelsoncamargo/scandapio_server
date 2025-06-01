import { CompanyType } from "@prisma/client";

export interface ICompanyCreate {
  name: string;
  documentId: string;
  companyType: CompanyType;
}

export interface ICompanyCreateDto {
  message: string;
}