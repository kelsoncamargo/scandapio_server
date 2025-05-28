import { CompanyStatus, CompanyType } from "@prisma/client";

export interface IGetCompanyDto {
  id: string;
  logoUrl: string | null;
  name: string;
  documentId: string;
  companyType: CompanyType;
  isActive: CompanyStatus;
  createdAt: Date;
  updatedAt: Date;
}