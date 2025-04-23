import { Role } from "@prisma/client";

export interface IRegisterCompany {
  name: string;
  documentId: string;
  companyType: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  documentIdCompany: string;
}

export interface IRegisterUserDto {
  name: string;
  email: string;
  role: Role;
}

export interface ILoginUser {
  email: string;
  password: string;
  documentIdCompany: string;
}

export interface ILoginUserDatabase {
  id: string;
  email: string;
  role: Role;
}

export interface ILoginUserDto {
  token: string;
}

export interface IUpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface IUpdateUserDto {
  name?: string;
  email?: string;
  role?: Role;
}

export interface IDeleteUser {
  id: string;
}



