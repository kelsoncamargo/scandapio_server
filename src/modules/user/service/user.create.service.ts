/**
 * create
 *
 * Creates a new user for a company if the email is not already in use.
 *
 * @param {IUserCreate} params                           - User creation data.
 * @param {string}      params.documentId         - Company’s document ID.
 * @param {string}      params.email                     - User’s email address.
 * @param {string}      params.name                      - User’s full name.
 * @param {string}      params.password                  - User’s password (hashed).
 * @param {Role}        params.role                      - User’s assigned role.
 * @returns {Promise<IUserCreateDto>}                    - Resolves to an object containing:
 *                                                          • documentId: string  
 *                                                          • email: string  
 *                                                          • name: string  
 *                                                          • role: Role
 * @throws {Error}                                       - If the email is already in use:  
 *                                                          MessageMap.ERROR.MODULE.USER.SERVICE.IN_USE  
 * @throws {Error}                                       - On database error (propagated from repository).
 */

import { userRepository } from "../repo/user.repo";
import { IUserCreate, IUserCreateDto } from "../interface/user.create.interface";
import { MessageMap } from "../../../shared/messages";
import { encryptPassword } from "../../../shared/password";

export const create = async ({
  documentId,
  email,
  name,
  password,
  role
}: IUserCreate): Promise<IUserCreateDto> => {
  const userExists = await userRepository.get({ documentId, email });

  if (userExists) {
    throw new Error(MessageMap.ERROR.USER.IN_USE);
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