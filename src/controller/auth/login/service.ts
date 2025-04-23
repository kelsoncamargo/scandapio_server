import { MessageMap } from "../../../utils/message";
import { generateToken } from "../../../utils/token";
import login from "./database";
import { ILoginProps } from "./interface";

class LoginServiceAccount {
  async getLogin({ email, password }: ILoginProps) {
    const data = await login({ email, password });

    if (data) {
      return generateToken({
        id: data.id,
        email: data.email,
        role: data.role
      });
    }

    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }
}

export default new LoginServiceAccount();
