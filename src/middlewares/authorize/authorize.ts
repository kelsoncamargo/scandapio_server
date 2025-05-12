// src/auth/middleware/authorize.ts

import { Request, Response, NextFunction } from "express";
import { Permission, rolePermissions } from "../permissions/permissions";
import { IJwtPayload } from "../../shared/token/token.jwt.interface";

/**
 * AuthRequest
 * @extends Request
 * @property {IJwtPayload} user — payload decodificado do JWT
 */
export interface AuthRequest extends Request {
  user: IJwtPayload;
}

/**
 * authorize
 *
 * Middleware factory that checks whether req.user.role
 * has the required permission.
 *
 * @param {Permission} required — permissão no formato "recurso:ação"
 * @returns {(req: AuthRequest, res: Response, next: NextFunction) => void}
 * @throws Quando req.user não tiver a permissão necessária (resposta HTTP 403)
 */
export function authorize(required: Permission) {
  const [requiredResource, requiredAction] = required.split(":");

  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Lista de permissões do papel (role) ou array vazio
    const perms = rolePermissions[req.user.role] ?? [];

    // Verifica se existe ao menos uma permissão que case
    const allowed = perms.some((perm) => {
      const [permResource, permAction] = perm.split(":");

      const resourceMatch =
        permResource === "*" || permResource === requiredResource;
      const actionMatch =
        permAction === "*" || permAction === requiredAction;

      return resourceMatch && actionMatch;
    });

    if (!allowed) {
      // @throws Forbidden se não autorizado
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    // @returns void e segue o fluxo se autorizado
    next();
  };
}
