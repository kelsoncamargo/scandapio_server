/**
 * get
 *
 * Express handler to authenticate a user by email, password, and company document ID.
 *
 * @param {Request}  request  - Express request containing credentials in body:
 *                              • email: string  
 *                              • password: string  
 *                              • documentId: string
 * @param {Response} response - Express response object.
 * @returns {Promise<Response>} - On success, sends 200 OK with:
 *                                • message: MessageMap.SUCCESS.CONTROLLER.USER.LOGIN  
 *                                • user data (as returned by the service)
 * @throws {Error}             - On authentication or retrieval failure,  
 *                                responds with 400 Bad Request and the error message
 */

import { Request, Response } from "express";
import { userService } from "../service/user.service";
import { MessageMap } from "../../../shared/messages";


export const get = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body;

    const credentials = {
      email: reqData.email,
      password: reqData.password,
      documentId: reqData.documentId,
    };

    const user = await userService.get(credentials);

    return response.send({
      ...user
    });

  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}