import { Role } from "@prisma/client";

export interface IJwtPayload {
  id: string;
  email: string;
  role: Role;
  [key: string]: any; // to allow future expansion, like "companyId", "permissions"
}
