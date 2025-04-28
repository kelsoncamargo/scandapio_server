import { Role } from "@prisma/client";

export interface IUpdateCompany {
  id: string;
  newName?: string;
  newDocumentId?: string;
  newCompanyType?: string;
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



