import { MessageMap } from "../../utils/message";
import { encryptPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import {
  loginUser,
  registerCompany,
  registerUser,
  updateUser
} from "./auth.database";
import {
  ILoginUser,
  ILoginUserDto,
  IRegisterCompany,
  IRegisterUser,
  IRegisterUserDto,
  IUpdateUser
} from "./auth.interface";


export class RegisterServiceCompany {
  async register({
    documentId,
    companyType,
    name,
  }: IRegisterCompany): Promise<string> {
    console.log(documentId, companyType, name)
    return await registerCompany({
      documentId,
      companyType,
      name
    });
  }
}

export class RegisterServiceUser {
  async register({
    documentIdCompany,
    email,
    password,
    name,
    role
  }: IRegisterUser): Promise<IRegisterUserDto> {
    const encryptedPassword = await encryptPassword(password);

    return await registerUser({
      documentIdCompany,
      email,
      password: encryptedPassword,
      name,
      role
    });
  }
}

export class LoginServiceUser {
  async login({
    documentIdCompany,
    email,
    password
  }: ILoginUser): Promise<string> {
    const user = await loginUser({ documentIdCompany, email, password });

    if (user) {
      return generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });
    }

    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }
}

export class UpdateServiceUser {
  async update({ id, email, name, password, role }: IUpdateUser) {
    const user = updateUser({ id, email, name, password, role });
  }
}
