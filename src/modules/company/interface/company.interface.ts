export interface IRegisterCompany {
  name: string;
  documentId: string;
  companyType: string;
  companyLicenseId: string;
}

export interface IRegisterCompanyDto {
  message: string;
}

export interface IGetCompanyDto {
  id: string;
  name: string;
  companyLicenseId: string;
  documentId: string;
}