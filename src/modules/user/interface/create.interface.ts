import { Role } from "@prisma/client";

export interface ICreateUser {
  documentIdCompany: string;
  email: string;
  password: string;
  role: Role;
  name: string;
};

export interface ICreateUserDto {
  documentIdCompany: string;
  name: string;
  email: string;
  role: Role;
};

