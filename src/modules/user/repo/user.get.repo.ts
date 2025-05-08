/**
 * Retrieves a user by email and company document ID.
 *
 * @param {IGetUser} params                    - Query parameters.
 * @param {string}   params.email              - User's email address.
 * @param {string}   params.documentIdCompany  - Company's document ID.
 * @returns {Promise<IGetUserDto>}             - Resolves to an object containing:
 *                                                 • documentIdCompany: string
 *                                                 • email: string
 *                                                 • name: string
 *                                                 • role: Role
 * @throws {Error}                             - If no user is found:
 *                                                 MessageMap.ERROR.MODULE.USER.REPO.NOT_USER
 * @throws {Error}                             - On any database error:
 *                                                 MessageMap.ERROR.MODULE.DATABASE
 */

import { MessageMap } from "../../../shared/messages";
import database from "../../../config/database";
import {
  IGetUser,
  IGetUserDto,
} from "../interface/get.interface";

export const get = async ({
  documentIdCompany,
  email
}: IGetUser): Promise<IGetUserDto> => {
  try {
    const user = await database.user.findUnique({
      where: {
        email_documentIdCompany: {
          email,
          documentIdCompany
        }
      },
      select: {
        documentIdCompany: true,
        email: true,
        name: true,
        role: true
      }
    })

    if (!user) {
      throw new Error(`${MessageMap.ERROR.MODULE.USER.REPO.NOT_USER}`);
    }

    return ({ ...user });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.MODULE.DATABASE}`);
  }
};
