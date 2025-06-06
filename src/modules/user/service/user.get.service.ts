/**
 * get
 *
 * Retrieves a user by company document ID and email.
 *
 * @param {IUserGet} params                        - Lookup parameters.
 * @param {string}    params.documentId     - Company's document ID.
 * @param {string}    params.email                 - User's email address.
 * @returns {Promise<IUserGetDto>}                 - Resolves to an object containing:
 *                                                    • documentId: string  
 *                                                    • email: string  
 *                                                    • name: string  
 *                                                    • role: Role
 * @throws {Error}                                 - If no user is found:  
 *                                                    MessageMap.ERROR.MODULE.USER.REPO.NOT_USER
 * @throws {Error}                                 - On database error:  
 *                                                    MessageMap.ERROR.MODULE.DATABASE
 */

import { userRepository } from "../repo/user.repo";
import { IUserGet, IUserGetDto } from "../interface/user.get.interface";
import { MessageMap } from "../../../shared/messages";

export const get = async ({
  documentId,
  email
}: IUserGet): Promise<IUserGetDto> => {
  const user = await userRepository.get({ documentId, email });

  if (!user) {
    throw new Error(`${MessageMap.ERROR.USER.NOT_FOUND}`);
  }

  return user;
}