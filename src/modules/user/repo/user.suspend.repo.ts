/**
 * suspend
 *
 * Repository method to suspend a user by updating their active status.
 *
 * @param {IUserSuspend} params
 *   - `documentId` (string): Company document identifier.
 *   - `email` (string): User’s email address.
 *   - `isActive` (boolean): The active status to set (false to suspend).
 * @returns {Promise<User>}
 *   - Resolves with the updated User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IUserSuspend,
} from "../interface/user.suspend.interface";

export const Suspend = async ({
  documentId,
  email,
  isActive
}: IUserSuspend): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        email_documentId: {
          documentId,
          email
        }
      },
      data: {
        isActive: isActive
      }
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};