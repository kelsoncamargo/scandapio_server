/**
 * create
 *
 * Express handler to register a new user.
 *
 * @param {Request}  request  - Express request containing user data in body:
 *                              • name: string
 *                              • email: string
 *                              • password: string
 *                              • role: Role
 *                              • documentId: string
 * @param {Response} response - Express response object.
 * @returns {Promise<Response>} - On success, sends 200 OK with:
 *                                • message: SUCCESS.REPO.REGISTER
 *                                • user data (documentId, email, name, role)
 * @throws {Error}            - On validation or creation failure:
 *                                responds with 400 Bad Request and error message
 */

import { Request, Response } from "express";
import { companyService } from "../service/comapany.service";

export const create = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body;

    const userData = {
      name: reqData.name,
      documentId: reqData.documentId,
      companyType: reqData.companyType
    };

    const comapany = await companyService.create(userData);

    return response.send({
      ...comapany
    });

  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}