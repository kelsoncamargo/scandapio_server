import { AccountRole } from "@prisma/client";
import { IAccountDTO } from "../../../shared/interfaces/account";
import { encryptPassword } from "../../../utils/password";
import { register } from "./database";
import { IRegisterAccount } from "./interface";


class RegisterServiceAccount {
  async register({
    fullName,
    phone,
    email,
    password,
    role
  }: IRegisterAccount): Promise<IAccountDTO> {
    const encryptedPassword = await encryptPassword(password);

    return await register({
      fullName,
      phone,
      email,
      password: encryptedPassword,
      role,
    });
  }
}

export default new RegisterServiceAccount();
