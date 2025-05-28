import { Role } from "@prisma/client";

export interface IGetUser {
  documentId: string;
  email: string;
};

export interface IGetUserDto {
  documentId: string;
  name: string;
  email: string;
  role: Role;
};

