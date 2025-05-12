// src/auth/middleware/authenticate.ts

import { Request, Response, NextFunction } from "express";
import { validateToken } from "../service/auth.service";
import { MessageMap } from "../../../shared/messages";
import { IJwtPayload } from "../../../shared/token/token.jwt.interface";

/**
 * Express middleware that checks for a JWT in HttpOnly cookie 'accessToken',
 * validates it and attaches the decoded payload to `req.user`.
 */

type AuthRequest = Request & { user: IJwtPayload };

export async function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: MessageMap.ERROR.MIDDLEWARE.AUTH.UNAUTHORIZED });
    }

    // Validate token and retrieve payload
    const payload = await validateToken(token);

    // Attach payload (id, email, role, companyId, etc.) to request
    req.user = payload;

    next();
  } catch {
    return res
      .status(401)
      .json({ message: MessageMap.ERROR.MIDDLEWARE.AUTH.UNAUTHORIZED });
  }
}
