import { login } from "./auth.login.service";

class AuthService {
  login = login;
}

export const authService = new AuthService();