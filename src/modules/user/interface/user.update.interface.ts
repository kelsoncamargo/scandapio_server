import { Role } from "@prisma/client";

export interface IUserUpdate {
  documentId: string;
  email: string;
  newEmail?: string;
  password?: string;
  role?: Role;
  name?: string;
};

export interface IUserUpdateDto {
  id: string;
  documentId: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

