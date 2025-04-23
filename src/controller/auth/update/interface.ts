import { AccountRole } from "@prisma/client";

export interface IUpdateProps {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: AccountRole;
}