/**
 * create
 *
 * Repository method to create a new user and mark them as active.
 *
 * @param {IUserCreate} params
 *   - `documentId` (string): Company document identifier.
 *   - `email` (string): User’s email address.
 *   - `name` (string): User’s full name.
 *   - `password` (string): User’s hashed password.
 *   - `role` (Role): User’s assigned role.
 * @returns {Promise<User>}
 *   - Resolves with the newly created User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IUserCreate,
} from "../interface/user.create.interface";

export const create = async ({
  documentId,
  email,
  name,
  password,
  role
}: IUserCreate): Promise<User> => {
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
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};