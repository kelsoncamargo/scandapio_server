import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import { decryptPassword } from "../../../shared/password";
import { userRepository } from "../../user/repo/user.repo";
import { IAuthLogin } from "../interface/auth.login.interface";

export const login = async (loginData: IAuthLogin): Promise<User> => {
  try {
    const user = await userRepository.get({
      documentId: loginData.documentId,
      email: loginData.email
    });

    const validPassword = decryptPassword(loginData.password, user.password);

    if (!validPassword) {
      throw new Error(MessageMap.ERROR.MODULE.AUTH.FOUND);
    }

    return user
  } catch (err) {
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
}