/**
 * authorize
 *
 * Middleware factory that checks whether req.user.role
 * has the required permission.
 *
 * @param {Permission} required            - Permission in the format "resource:action"
 * @returns {import("express").RequestHandler}  
 *   Express middleware function (req, res, next).
 * @throws {403}                          - If req.user.role does not have the required permission.
 *
 * @typedef {import("express").Request & { user: IJwtPayload }} AuthRequest
 */

import { Response, NextFunction } from "express";
import { Permission, rolePermissions } from "../permissions/permissions";
import { MessageMap } from "../../shared/messages";
import { AuthRequest } from "../../types/authRequest.type";

export function authorize(required: Permission) {
  const [requiredResource, requiredAction] = required.split(":");

  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const perms = rolePermissions[req.user.role] ?? [];

    const allowed = perms.some((perm) => {
      const [permResource, permAction] = perm.split(":");

      const resourceMatch =
        permResource === "*" || permResource === requiredResource;
      const actionMatch =
        permAction === "*" || permAction === requiredAction;

      return resourceMatch && actionMatch;
    });

    if (!allowed) {
      res.status(403).json({ message: MessageMap.ERROR.MIDDLEWARE.AUTHORIZE.FORBIDDEN });
      return;
    }

    next();
  };
}

authorize("user:*")

