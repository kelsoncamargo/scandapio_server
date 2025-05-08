import { Role } from "@prisma/client";

export interface IGetUser {
  documentIdCompany: string;
  email: string;
};

export interface IGetUserDto {
  documentIdCompany: string;
  name: string;
  email: string;
  role: Role;
};

