/**
 * Retrieves a user by email and company document ID.
 *
 * @param {IGetUser} params                    - Query parameters.
 * @param {string}   params.email              - User's email address.
 * @param {string}   params.documentId  - Company's document ID.
 * @returns {Promise<IGetUserDto>}             - Resolves to an object containing:
 *                                                 • documentId: string
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
} from "../interface/user.get.interface";
import { User } from "@prisma/client";

export const get = async ({
  documentId,
  email
}: IGetUser): Promise<any> => {
  try {
    const user = await database.user.findUnique({
      where: {
        email_documentId: {
          email,
          documentId
        }
      }
    })

    return user;
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.MODULE.DATABASE}`);
  }
};
