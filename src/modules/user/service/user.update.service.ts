/**
 * update
 *
 * Service method to update a user’s details, hashing the password if provided.
 *
 * @param {IUserUpdate} params
 *   – `documentId` (string): Company document identifier.
 *   – `email` (string): User’s current email address.
 *   – `name` (string | undefined): New user name (optional).
 *   – `newEmail` (string | undefined): New email address (optional).
 *   – `password` (string | undefined): New password to hash (optional).
 *   – `role` (Role | undefined): New role to assign (optional).
 * @returns {Promise<IUserUpdateDto | Error>}
 *   – Resolves with the updated user DTO on success.
 *   – Returns `Error(MessageMap.ERROR.USER.IN_USE)` if no existing user is found.
 * @throws {Error}
 *   – Throws `MessageMap.ERROR.MODULE.DATABASE` on any database failure during update.
 */

import { User } from "@prisma/client";
import { MessageMap } from "../../../shared/messages";
import { IUserUpdate, IUserUpdateDto } from "../interface/user.update.interface";
import { userRepository } from "../repo/user.repo";
import { update as updateRepo } from "../repo/user.update.repo"
import { encryptPassword } from "../../../shared/password";

export const update = async ({
  documentId,
  name,
  email,
  newEmail,
  password,
  role
}: IUserUpdate): Promise<IUserUpdateDto | Error> => {
  const user: User | null = await userRepository.get({ documentId, email });
  let newPassword;

  if (!user) {
    return new Error(MessageMap.ERROR.USER.IN_USE);
  }

  if (password) {
    newPassword = await encryptPassword(password);
  }

  return await updateRepo({
    documentId,
    email,
    newEmail: newEmail,
    name: name ?? user.name,
    password: newPassword ?? user.password,
    role: role ?? user.role
  });
}