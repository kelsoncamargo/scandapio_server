/**
 * get
 *
 * Retrieves a user by company document ID and email.
 *
 * @param {IGetUser} params                        - Lookup parameters.
 * @param {string}    params.documentId     - Company's document ID.
 * @param {string}    params.email                 - User's email address.
 * @returns {Promise<IGetUserDto>}                 - Resolves to an object containing:
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
import { IGetUser, IGetUserDto } from "../interface/user.get.interface";
import { MessageMap } from "../../../shared/messages";

export const get = async ({
  documentId,
  email
}: IGetUser): Promise<IGetUserDto> => {
  const user = await userRepository.get({ documentId, email });

  if (!user) {
    throw new Error(`${MessageMap.ERROR.MODULE.USER.REPO.NOT_USER}`);
  }

  return user;
}