import { MessageMap } from "../../../utils/message";
import database from "../../../config/database";
import {
  IRegisterUser,
  IRegisterUserDto,
} from "../interface/user.interface";


export class RegisterUserRepository {
  async findUserByEmail(email: string, documentIdCompany: string): Promise<true | false> {
    try {
      const user = await database.user.findFirst({
        where: { email, documentIdCompany }
      })

      return user ? true : false;
    } catch (err) {
      throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
    }
  }

  async createUser({
    documentIdCompany,
    email,
    name,
    password,
    role
  }: IRegisterUser): Promise<IRegisterUserDto> {
    try {
      return await database.user.create({
        data: {
          documentIdCompany,
          email,
          name,
          password,
          role,
        },
        select: {
          documentIdCompany: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (err) {
      throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
    }
  };
}