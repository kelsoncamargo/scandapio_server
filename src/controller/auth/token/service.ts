import { IAccountDTO } from "../../../shared/interfaces/account";
import { MessageMap } from "../../../utils/message";
import validate from "./database";
import { ITokenProps } from "./interface";

class TokenService {
  async validate({ token }: ITokenProps): Promise<IAccountDTO | null> {
    const data = await validate({ token });
    if (data) return data;
    throw new Error(MessageMap.ERROR.USER_NOT_FOUND);
  }
}

export default new TokenService();
