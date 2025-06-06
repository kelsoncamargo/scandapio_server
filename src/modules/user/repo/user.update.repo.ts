/**
 * update
 *
 * Repository method to update a user’s details.
 *
 * @param {IUserUpdate} params
 *   – `documentId` (string): Current company document identifier.
 *   – `email` (string): User’s current email address.
 *   – `name` (string): New user name.
 *   – `newEmail` (string | undefined): New email address (optional).
 *   – `password` (string): New hashed password.
 *   – `role` (Role): New role to assign to the user.
 * @returns {Promise<User>}
 *   – Resolves with the updated User record.
 * @throws {Error}
 *   – Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IUserUpdate
} from "../interface/user.update.interface";

export const update = async ({
  documentId,
  email,
  name,
  newEmail,
  password,
  role
}: IUserUpdate): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        email_documentId: {
          documentId,
          email
        }
      },
      data: {
        documentId,
        email: newEmail,
        name,
        password,
        role,
      }
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};