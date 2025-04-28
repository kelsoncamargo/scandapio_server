import { Role } from "@prisma/client";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  documentIdCompany: string;
}

export interface IRegisterUserDto {
  documentIdCompany: string;
  name: string;
  email: string;
  role: Role;
}