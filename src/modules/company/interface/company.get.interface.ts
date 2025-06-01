import { CompanyStatus, CompanyType } from "@prisma/client";

export interface ICompanyGet {
  documentId: string;
}

export interface ICompanyGetDto {
  id: string;
  logoUrl?: string | null;
  name: string;
  documentId: string;
  companyType: CompanyType;
  isActive: CompanyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ICompanyGetDtoOrNull = ICompanyGetDto | null;