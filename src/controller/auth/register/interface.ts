import { AccountRole } from "@prisma/client";


export interface IRegisterAccount {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: AccountRole;
}