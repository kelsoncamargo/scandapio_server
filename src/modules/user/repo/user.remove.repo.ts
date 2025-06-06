/**
 * remove
 *
 * Repository method to delete a user by email and company document ID.
 *
 * @param {IUserRemove} params
 *   - `documentId` (string): Company document identifier.
 *   - `email` (string): User’s email address.
 * @returns {Promise<User>}
 *   - Resolves with the deleted User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IUserRemove,
} from "../interface/user.remove.interface";

export const remove = async ({
  documentId,
  email
}: IUserRemove): Promise<User> => {
  try {
    return await database.user.delete({
      where: {
        email_documentId: {
          documentId,
          email
        }
      }
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};