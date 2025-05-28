/**
 * @module permissions
 * @description Maps each user role to its corresponding set of permissions.
 *
 * This constant ensures that every Role enum value has an explicit array of
 * Permission strings defining allowed operations in the application.
 *
 * @constant {Record<Role, Permission[]>} rolePermissions
 */

import { Role } from "@prisma/client";

export type Permission = `${string}:${string}`;

export const rolePermissions: Record<Role, Permission[]> = {
  OWNER: ["*:*"],
  ADMIN: ["menu:*", "order:*", "user:*", "company:*"],
  STAFF: ["menu:read", "order:manage"],
  VIEWER: ["menu:read", "order:read"],
};
