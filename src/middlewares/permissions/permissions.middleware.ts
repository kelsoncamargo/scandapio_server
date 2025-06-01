/**
 * @module auth.permissions
 * @description Defines Permission type and maps each Role to its allowed permissions.
 *
 * @typedef {`${string}:${string}`} Permission
 *   – Template literal type representing "resource:action".
 *
 * @constant {Record<Role, Permission[]>} rolePermissions
 *   – Maps each Role to an array of allowed permissions:
 *     • OWNER: ["*:*"]
 *     • ADMIN: ["menu:*", "order:*", "user:*", "company:*"]
 *     • STAFF: ["menu:read", "order:manage"]
 *     • VIEWER: ["menu:read", "order:read"]
 */
import { Role } from "@prisma/client";

export type Permission = `${string}:${string}`;

export const rolePermissions: Record<Role, Permission[]> = {
  OWNER: ["*:*"],
  ADMIN: ["menu:*", "order:*", "user:*", "company:read"],
  STAFF: ["menu:read", "order:manage"],
  VIEWER: ["menu:read", "order:read"],
};
