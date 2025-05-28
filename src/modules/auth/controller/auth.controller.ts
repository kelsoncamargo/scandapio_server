import { login } from "./auth.login.controller";

export class AuthController {
  login = login;
}

export const authController = new AuthController();