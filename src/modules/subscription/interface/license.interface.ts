import { License } from "@prisma/client";

export interface ILicenseGet {
  licenseName: License;
}

export interface ILicenseGetDto {
  id: string;
  name: License;
  description: string | null;
  canAccessOrders: boolean;
  maxUsers: number;
  maxMenus: number;
  maxItems: number;
  priceMonthly: number;
  apiAccess: boolean;
  createdAt: Date;
}
