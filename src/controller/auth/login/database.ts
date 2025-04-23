import database from "../../../config/database";
import { MessageMap } from "../../../utils/message";
import { decryptPassword } from "../../../utils/password";
import { ILoginProps } from "./interface";

const login = async ({ email, password }: ILoginProps) => {
  const account = await database.account.findFirst({
    where: {
      email,
    },
  });

  if (!account) {
    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }

  const isPasswordValid = await decryptPassword(password, account.password);
  if (!isPasswordValid) {
    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }

  return {
    id: account.id,
    email: account.email,
    role: account.role,
  };
};

export default login;
