/**
 * requireCompanyActiveOrOwner
 *
 * Express middleware that ensures the authenticated user’s company is ACTIVE,
 * or allows access if the user’s role is OWNER even when the company is inactive.
 *
 * @param {Request}        req   – Express request object, expects `req.payload.documentId` and `req.payload.role`.
 * @param {Response}       res   – Express response object.
 * @param {NextFunction}   next  – Next middleware function.
 * @returns {Promise<void>}
 *   – Calls `next()` if the company is ACTIVE or the user’s role is OWNER.
 * @throws {403}
 *   – If the company is not ACTIVE and the user’s role is not OWNER, responds with MessageMap.ERROR.MIDDLEWARE.COMPANY.INACTIVE.
 */


import { CompanyStatus, Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { companyService } from "../../modules/company/service/company.service";
import { MessageMap } from "../../shared/messages";


export async function requireCompanyActiveOrOwner(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {

  const company = await companyService.get({
    documentId: req.payload.documentId
  })

  if (company.isActive !== CompanyStatus.ACTIVE && req.payload.role !== Role.OWNER) {
    res.status(403).json({ message: MessageMap.ERROR.MIDDLEWARE.COMPANY.INACTIVE });
    return;
  }

  next();
}