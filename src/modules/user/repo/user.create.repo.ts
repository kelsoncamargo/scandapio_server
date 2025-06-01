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
      }
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.MODULE.DATABASE}`);
  }
};