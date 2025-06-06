import { Role } from "@prisma/client";

export interface IUserCreate {
  documentId: string;
  email: string;
  password: string;
  role: Role;
  name: string;
};

export interface IUserCreateDto {
  id: string;
  documentId: string;
  name: string;
  email: string;
  role: Role;
};

