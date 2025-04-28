/**
 * RegisterUserRepository
 * 
 * Repository class responsible for managing User registration-related database operations.
 * 
 * Methods:
 * 
 * - findUserByEmail(email: string, documentIdCompany: string): Promise<true | false>
 *   => Searches for a user by email and associated company document ID.
 *   => Returns `true` if the user exists, otherwise `false`.
 *   => Throws an error with MessageMap.ERROR.REPO.DATABASE on failure.
 * 
 * - createUser({ documentIdCompany, email, name, password, role }: IRegisterUser): Promise<IRegisterUserDto>
 *   => Creates a new user associated with a company.
 *   => Returns selected user fields (documentIdCompany, name, email, role).
 *   => Throws an error with MessageMap.ERROR.REPO.DATABASE on failure.
 * 
 */
import { MessageMap } from "../../../shared/messages";
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
      throw new Error(MessageMap.ERROR.REPO.DATABASE);
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
      throw new Error(MessageMap.ERROR.REPO.DATABASE);
    }
  };
}