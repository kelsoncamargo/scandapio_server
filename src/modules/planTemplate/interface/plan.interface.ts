import { CompanyPlan, License } from "@prisma/client";

export interface IRegisterPlan {
  companyId: string;
  licenseName: License;
}

export interface IRegisterPlanDto {
  plan: object;
}
