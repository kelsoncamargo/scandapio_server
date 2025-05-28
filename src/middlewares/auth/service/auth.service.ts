// src/auth/services/auth.service.ts

import database from "../../../config/database";
import { verifyToken } from "../../../shared/token/token.jwt";
import { IJwtPayload } from "../../../shared/token/token.jwt.interface";
import { MessageMap } from "../../../shared/messages";

/**
 * Validates a JWT access token and ensures the user is active.
 *
 * @param {string} token
 * @returns {Promise<IJwtPayload>}
 * @throws {Error} If the token is invalid/expired or the user is inactive.
 */
export async function validateToken(token: string): Promise<IJwtPayload> {
  // Decode and verify signature / expiration
  const payload = verifyToken(token);

  // Confirm user still exists and is active
  const user = await database.user.findUnique({
    where: { id: payload.id },
    select: { isActive: true },
  });

  if (!user || !user.isActive) {
    throw new Error(MessageMap.ERROR.MIDDLEWARE.AUTH.UNAUTHORIZED);
  }

  return payload;
}
