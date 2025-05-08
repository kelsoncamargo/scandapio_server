/**
 * create
 *
 * Creates a new user for a company if the email is not already in use.
 *
 * @param {ICreateUser} params                           - User creation data.
 * @param {string}      params.documentIdCompany         - Company’s document ID.
 * @param {string}      params.email                     - User’s email address.
 * @param {string}      params.name                      - User’s full name.
 * @param {string}      params.password                  - User’s password (hashed).
 * @param {Role}        params.role                      - User’s assigned role.
 * @returns {Promise<ICreateUserDto>}                    - Resolves to an object containing:
 *                                                          • documentIdCompany: string  
 *                                                          • email: string  
 *                                                          • name: string  
 *                                                          • role: Role
 * @throws {Error}                                       - If the email is already in use:  
 *                                                          MessageMap.ERROR.MODULE.USER.SERVICE.IN_USE  
 * @throws {Error}                                       - On database error (propagated from repository).
 */

import { userRepository } from "../repo/user.repo";
import { ICreateUser, ICreateUserDto } from "../interface/create.interface";
import { MessageMap } from "../../../shared/messages";

export const create = async ({
  documentIdCompany,
  email,
  name,
  password,
  role
}: ICreateUser): Promise<ICreateUserDto> => {
  const userExists = await userRepository.get({ documentIdCompany, email });

  if (userExists) {
    throw new Error(MessageMap.ERROR.MODULE.USER.SERVICE.IN_USE);
  }

  return await userRepository.create({
    documentIdCompany,
    email,
    name,
    password,
    role
  });
}