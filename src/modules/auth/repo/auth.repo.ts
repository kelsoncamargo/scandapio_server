import { login } from "./auth.login.repo";

class LoginRepository {
  login = login;
}

export const loginRepository = new LoginRepository();