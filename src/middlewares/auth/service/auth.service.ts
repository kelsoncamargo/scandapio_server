/**
 * validateToken
*
* Decodes and verifies a JWT, then ensures the corresponding user is active.
*
* @param {string} token
* @returns {Promise<IJwtPayload>}
* @throws {Error} If token is invalid/expired or user is inactive.
*/
import database from "../../../config/database";
import { MessageMap } from "../../../shared/messages";
import { verifyToken } from "../../../shared/token/token.jwt";
import { IJwtPayload } from "../../../shared/token/token.jwt.interface";

export async function validateToken(token: string): Promise<IJwtPayload> {
  const payload = verifyToken(token);
  const user = await database.user.findUnique({
    where: { id: payload.id },
    select: { isActive: true },
  });
  if (!user || !user.isActive) {
    throw new Error(MessageMap.ERROR.MIDDLEWARE.AUTH.UNAUTHORIZED);
  }
  return payload;
}
