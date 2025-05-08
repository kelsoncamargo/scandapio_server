/**
 * get
 *
 * Retrieves a user by company document ID and email.
 *
 * @param {IGetUser} params                        - Lookup parameters.
 * @param {string}    params.documentIdCompany     - Company's document ID.
 * @param {string}    params.email                 - User's email address.
 * @returns {Promise<IGetUserDto>}                 - Resolves to an object containing:
 *                                                    • documentIdCompany: string  
 *                                                    • email: string  
 *                                                    • name: string  
 *                                                    • role: Role
 * @throws {Error}                                 - If no user is found:  
 *                                                    MessageMap.ERROR.MODULE.USER.REPO.NOT_USER
 * @throws {Error}                                 - On database error:  
 *                                                    MessageMap.ERROR.MODULE.DATABASE
 */

import { userRepository } from "../repo/user.repo";
import { IGetUser, IGetUserDto } from "../interface/get.interface";

export const get = async ({
  documentIdCompany,
  email
}: IGetUser): Promise<IGetUserDto> => {
  const user = await userRepository.get({ documentIdCompany, email });

  return user;
}