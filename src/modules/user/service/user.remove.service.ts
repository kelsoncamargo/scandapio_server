/**
 * remove
 *
 * Service method to delete a user by email and company document ID.
 *
 * @param {IUserRemove} params
 *   – `documentId` (string): Company document identifier.
 *   – `email` (string): User’s email address.
 * @returns {Promise<IUserRemoveDto>}
 *   – Resolves with `{ message: string }` containing:
 *     MessageMap.SUCCESS.USER.REMOVED.
 * @throws {Error}
 *   – Throws MessageMap.ERROR.USER.NOT_FOUND if no user is found.
 */

import { userRepository } from "../repo/user.repo";
import { IUserRemove, IUserRemoveDto } from "../interface/user.remove.interface";
import { MessageMap } from "../../../shared/messages";

export const remove = async ({
  documentId,
  email
}: IUserRemove): Promise<IUserRemoveDto> => {
  const user = await userRepository.get({ documentId, email });

  if (!user) {
    throw new Error(`${MessageMap.ERROR.USER.NOT_FOUND}`);
  }

  await userRepository.remove({ documentId, email })

  return { message: `${MessageMap.SUCCESS.USER.REMOVED}` };
}