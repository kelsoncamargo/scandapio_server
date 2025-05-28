/**
 * create
 *
 * Creates a new user for a company if the email is not already in use.
 *
 * @param {ICreateUser} params                           - User creation data.
 * @param {string}      params.documentId         - Company’s document ID.
 * @param {string}      params.email                     - User’s email address.
 * @param {string}      params.name                      - User’s full name.
 * @param {string}      params.password                  - User’s password (hashed).
 * @param {Role}        params.role                      - User’s assigned role.
 * @returns {Promise<ICreateUserDto>}                    - Resolves to an object containing:
 *                                                          • documentId: string  
 *                                                          • email: string  
 *                                                          • name: string  
 *                                                          • role: Role
 * @throws {Error}                                       - If the email is already in use:  
 *                                                          MessageMap.ERROR.MODULE.USER.SERVICE.IN_USE  
 * @throws {Error}                                       - On database error (propagated from repository).
 */

import { userRepository } from "../repo/user.repo";
import { ICreateUser, ICreateUserDto } from "../interface/user.create.interface";
import { MessageMap } from "../../../shared/messages";
import { encryptPassword } from "../../../shared/password";

export const create = async ({
  documentId,
  email,
  name,
  password,
  role
}: ICreateUser): Promise<ICreateUserDto> => {
  const userExists = await userRepository.get({ documentId, email });

  if (userExists) {
    throw new Error(MessageMap.ERROR.MODULE.USER.SERVICE.IN_USE);
  }

  const newPassword = await encryptPassword(password);

  return await userRepository.create({
    documentId,
    email,
    name,
    password: newPassword,
    role
  });
}