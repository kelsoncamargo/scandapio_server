import { Role } from "@prisma/client";

export type Permission = `${string}:${string}`;

export const rolePermissions: Record<Role, Permission[]> = {
  OWNER: ["*:*"],
  ADMIN: ["menu:*", "order:*", "user:*", "company:*"],
  STAFF: ["menu:read", "order:manage"],
  VIEWER: ["menu:read", "order:read"],
};
