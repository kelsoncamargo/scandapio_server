import { Role } from "@prisma/client";

export interface IAccountDTO {
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
