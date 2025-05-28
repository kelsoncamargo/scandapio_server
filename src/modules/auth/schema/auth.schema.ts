import { login } from "./auth.login.schema";

class AuthSchema {
  login = login;
}

export const authSchema = new AuthSchema();