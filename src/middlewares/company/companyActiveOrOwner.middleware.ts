/**
 * requireCompanyActiveOrOwner
 *
 * Allows access if the company is ACTIVE, or if the user.role is OWNER when inactive.
 *
 * @param {AuthRequest} req   - Express request with req.user.companyId and req.user.role
 * @param {Response}    res   - Express response
 * @param {NextFunction} next - Next middleware
 * @returns {void}
 * @throws {403} If the company is INACTIVE and user is not OWNER, or not found.
 */

import { CompanyStatus, Role } from "@prisma/client";
import { AuthRequest } from "aws-sdk/clients/appfabric";
import { NextFunction } from "express";
import database from "../../config/database";

export async function requireCompanyActiveOrOwner(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const company = await database.company.findUnique({
    where: { id: req.user.companyId },
    select: { isActive: true },
  });

  if (!company) {
    return res.status(404).json({ message: "Company not found." });
  }
  if (company.isActive !== CompanyStatus.ACTIVE && req.user.role !== Role.OWNER) {
    return res.status(403).json({ message: "Company inactive." });
  }

  next();
}