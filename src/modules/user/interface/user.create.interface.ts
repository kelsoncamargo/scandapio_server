import { Role } from "@prisma/client";

export interface ICreateUser {
  documentId: string;
  email: string;
  password: string;
  role: Role;
  name: string;
};

export interface ICreateUserDto {
  documentId: string;
  name: string;
  email: string;
  role: Role;
};

