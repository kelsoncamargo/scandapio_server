import { MessageMap } from "../../../utils/message";
import database from "../../../config/database";
import { IRegisterAccount } from "./interface";
import { IAccountDTO } from "../../../shared/interfaces/account";
import { validateErrorType } from "../../../utils/validateErrorType";

export const register = async ({
  fullName,
  phone,
  email,
  password,
  role,
}: IRegisterAccount): Promise<IAccountDTO> => {
  try {
    return await database.account.create({
      data: {
        email,
        phone,
        fullName,
        password,
        role
      },
      select: {
        fullName: true,
        phone: true,
        email: true,
        role: true,
        updatedAt: true,
        createdAt: true,
      }
    });
  } catch (err) {
    validateErrorType(err);
    throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
  }
};
