import database from "../../../config/database";
import { IAccountDTO } from "../../../shared/interfaces/account";
import { MessageMap } from "../../../utils/message";
import { validateErrorType } from "../../../utils/validateErrorType";
import { IRegisterAccount } from "../register/interface";

export const update = async (
  id: string,
  data: Partial<IRegisterAccount>
): Promise<IAccountDTO> => {
  try {
    return await database.account.update({
      where: { id },
      data,
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

export default update;
