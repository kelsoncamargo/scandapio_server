/**
 * suspend
 *
 * Service method to suspend a user by updating their active status.
 *
 * @param {IUserSuspend} params
 *   – `documentId` (string): Company document identifier.
 *   – `email` (string): User’s email address.
 *   – `isActive` (boolean): New active status to set (e.g., false to suspend).
 * @returns {Promise<IUserSuspendDto | Error>}
 *   – Resolves with `{ message: string }` containing MessageMap.SUCCESS.USER.SUSPEND.
 *   – Returns `Error(MessageMap.ERROR.USER.IN_USE)` if the user is not found.
 * @throws {Error}
 *   – Throws MessageMap.ERROR.MODULE.DATABASE on any database failure.
 */

import { MessageMap } from "../../../shared/messages";
import { IUserSuspend, IUserSuspendDto } from "../interface/user.suspend.interface";
import { userService } from "./user.service";
import { IUserGetDto } from "../interface/user.get.interface";
import { userRepository } from "../repo/user.repo";

export const suspend = async ({
  documentId,
  email,
  isActive
}: IUserSuspend): Promise<IUserSuspendDto> => {
  const user: IUserGetDto | null = await userService.get({ documentId, email });

  if (!user) {
    return new Error(MessageMap.ERROR.USER.IN_USE);
  }

  await userRepository.suspend({
    documentId,
    email,
    isActive: isActive
  });

  return { message: `${MessageMap.SUCCESS.USER.SUSPEND}` };
}