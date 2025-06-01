/**
 * suspend
 *
 * Express handler to suspend a company by its document ID.
 *
 * @param {Request}  req  - Express request object with:
 *                          • body.payload.documentId (string): Company’s document identifier.
 * @param {Response} res  - Express response object.
 * @returns {Promise<Response>}
 *   • Sends 200 OK with `{ message: string }` containing the suspension confirmation.
 * @throws {Error}
 *   • Responds with 400 Bad Request and `{ message: string }` when an error occurs.
 */

import { Request, Response } from "express";
import { companyService } from "../service/company.service";

export const suspend = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body.payload;

    const company = await companyService.suspend(reqData.documentId);

    return response.send({
      ...company
    });

  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}