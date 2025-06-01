/**
 * requireCompanyActive
 *
 * Express middleware that ensures the authenticated user’s company is ACTIVE.
 *
 * @param {Request}        req   – Express request object, expects `req.payload.documentId`.
 * @param {Response}       res   – Express response object.
 * @param {NextFunction}   next  – Next middleware function.
 * @returns {Promise<void>}
 *   – Calls `next()` if the company’s `isActive` status is ACTIVE.
 * @throws {403}
 *   – If the company is not ACTIVE, responds with MessageMap.ERROR.MIDDLEWARE.COMPANY.INACTIVE.
 */


import { Request, Response, NextFunction } from "express";
import { CompanyStatus, Role } from "@prisma/client";
import { MessageMap } from "../../shared/messages";
import { companyService } from "../../modules/company/service/company.service";

export async function requireCompanyActive(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const company = await companyService.get({
    documentId: req.payload.documentId
  })

  if (company.isActive !== CompanyStatus.ACTIVE) {
    res.status(403).json({ message: MessageMap.ERROR.MIDDLEWARE.COMPANY.INACTIVE });
    return;
  }

  next();
}