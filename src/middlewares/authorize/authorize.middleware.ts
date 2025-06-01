/**
 * authorize
 *
 * Middleware factory that checks if the authenticated user’s role
 * has the required permission.
 *
 * @param {Permission} required
 *   – Permission in the format "resource:action".
 * @returns {import("express").RequestHandler}
 *   – Express middleware function (req, res, next).
 * @throws {403}
 *   – If the user’s role does not include the required permission,
 *     responds with MessageMap.ERROR.MIDDLEWARE.AUTHORIZE.FORBIDDEN.
 */

import { Request, Response, NextFunction } from "express";
import { Permission, rolePermissions } from "../permissions/permissions.middleware";
import { MessageMap } from "../../shared/messages";

export function authorize(required: Permission) {
  const [requiredResource, requiredAction] = required.split(":");

  return (req: Request, res: Response, next: NextFunction): void => {
    const perms = rolePermissions[req.payload.role] ?? [];

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

