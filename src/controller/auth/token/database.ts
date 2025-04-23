import { IAccountDTO } from "../../../shared/interfaces/account";
import { MessageMap } from "../../../utils/message";
import { validateToken } from "../../../utils/token";
import { getAccount } from "../../../utils/account";
import { ITokenProps } from "./interface";

const validate = async ({ token }: ITokenProps): Promise<IAccountDTO> => {
  const hasToken = await validateToken({ token });
  if (hasToken) {
    const account = await getAccount(hasToken);
    return account;
  }
  throw new Error(MessageMap.ERROR.TOKEN_EXPIRED);
};

export default validate;
