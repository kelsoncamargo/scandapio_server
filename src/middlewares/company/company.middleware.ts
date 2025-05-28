/**
 * requireCompanyActive
 *
 * Ensures that the authenticated user's company is ACTIVE.
 *
 * @param {AuthRequest} req   - Express request with req.user.companyId
 * @param {Response}    res   - Express response
 * @param {NextFunction} next - Next middleware
 * @returns {void}
 * @throws {403} If the company is not ACTIVE or not found.
 */

import { Response, NextFunction } from "express";
import { CompanyStatus, Role } from "@prisma/client";
import database from "../../config/database";
import { AuthRequest } from "../../types/authRequest.type";
import { MessageMap } from "../../shared/messages";

export async function requireCompanyActive(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const company = await database.company.findUnique({
    where: { id: req.user.companyId },
    select: { isActive: true },
  });

  if (!company || company.isActive !== CompanyStatus.ACTIVE) {
    res.status(403).json({ message: MessageMap.ERROR.MIDDLEWARE.COMPANY.INACTIVE });
    return;
  }

  next();
}