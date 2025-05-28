/**
 * @module controller.company.get
 * @description Express handler to retrieve company details by its document ID.
 *
 * @function get
 * @param {import("express").Request} req – Express request object with `body.documentId` (string): the company's document identifier.
 * @param {import("express").Response} res – Express response object.
 *
 * @returns {Promise<import("express").Response>}  
 *   Sends 200 OK with the company data on success.
 *
 * @throws {400 Bad Request}  
 *   Responds with status 400 and `{ message: string }` when an error occurs.
 */


import { Request, Response } from "express";
import { companyService } from "../service/comapany.service";


export const get = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body;

    const credentials = {
      documentId: reqData.documentId,
    };

    const company = await companyService.get(credentials.documentId);

    return response.send({
      ...company
    });

  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}