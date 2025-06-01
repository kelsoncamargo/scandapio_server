/**
 * update
 *
 * Express handler to update a company’s details.
 *
 * @param {Request}  req  - Express request object with:
 *                          • body.payload.documentId (string): Current company’s document identifier.
 *                          • body.name (string | undefined): New company name (optional).
 *                          • body.newDocumentId (string | undefined): New document ID if renaming (optional).
 *                          • body.companyType (string | undefined): New company type/category (optional).
 *                          • body.logoUrl (string | undefined): New logo URL (optional).
 * @param {Response} res  - Express response object.
 * @returns {Promise<Response>}
 *   • Sends 200 OK with the updated company record on success.
 * @throws {Error}
 *   • Responds with 400 Bad Request and `{ message: string }` when an error occurs.
 */

import { Request, Response } from "express";
import { companyService } from "../service/company.service";

export const update = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body;

    const userData = {
      name: reqData.name,
      documentId: reqData.payload.documentId,
      newDocumentId: reqData.newDocumentId,
      companyType: reqData.companyType,
      logoUrl: reqData.logoUrl
    };

    const comapany = await companyService.update(userData);

    return response.send({
      ...comapany
    });

  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}