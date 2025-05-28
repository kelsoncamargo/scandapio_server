/**
 * UserRepository
 * 
 * Repository class responsible for managing User persistence operations.
 * 
 * Methods:
 * 
 * - create(data: ICreateUser): Promise<ICreateUserDto>
 *   → Creates a new user linked to a company.
 *   → Returns an object with selected fields: documentId, name, email, role.
 *   → Throws an Error(MessageMap.ERROR.MODULE.DATABASE) on database failure.
 * 
 * - get(email: string, documentId: string): Promise<ICreateUserDto>
 *   → Retrieves a user by email and company document ID.
 *   → Returns an object with selected fields: documentId, email, name, role.
 *   → Throws an Error(MessageMap.ERROR.MODULE.USER.REPO.NOT_USER) if no user is found.
 *   → Throws an Error(MessageMap.ERROR.MODULE.DATABASE) on database failure.
 */

import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  ICreateUser,
  ICreateUserDto,
} from "../interface/user.create.interface";

export const create = async ({
  documentId,
  email,
  name,
  password,
  role
}: ICreateUser): Promise<ICreateUserDto> => {
  try {
    return await database.user.create({
      data: {
        documentId,
        email,
        name,
        password,
        role,
        isActive: true
      },
      select: {
        documentId: true,
        name: true,
        email: true,
        role: true,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.MODULE.DATABASE}`);
  }
};