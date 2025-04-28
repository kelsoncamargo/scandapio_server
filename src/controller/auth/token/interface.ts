import { AccountRole } from "@prisma/client";
import { UUID } from "crypto";

export interface ITokenProps {
  token: string;
}

export interface ITokenDecoded {
  id: string;
  email: string;
  role: AccountRole;
  iat?: number;
  expiresIn?: number;
}

export interface IUserProps {
  documentCompany: string;
  email: string;
  role: AccountRole;
}

export interface IAllAccountsProps {
  id: string;
  email: string;
}


