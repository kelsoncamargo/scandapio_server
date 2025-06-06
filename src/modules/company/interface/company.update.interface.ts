import { CompanyType } from "@prisma/client";

export interface ICompanyUpdate {
  documentId: string;
  logoUrl?: string | null;
  name?: string;
  newDocumentId?: string;
  companyType?: CompanyType;
}

export interface ICompanyUpdateDto {
  logoUrl?: string | null;
  name: string;
  documentId: string;
  companyType: CompanyType;
}