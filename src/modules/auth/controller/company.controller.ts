/**
 * ControllerCompany
 * 
 * Controller class responsible for handling HTTP requests related to Company and initial User registration.
 * 
 * Methods:
 * 
 * - register(request: Request, response: Response): Promise<Response>
 *   => Handles the full registration flow for a new company and its first user (Owner).
 *   => Steps:
 *      1. Extracts company and user data from the request body.
 *      2. Registers the company via ServiceCompany.
 *      3. Registers the owner user via ServiceUser.
 *      4. Generates an access token and refresh token.
 *      5. Sets authentication cookies (accessToken and refreshToken) on the response.
 *      6. Returns a success message with user information.
 *   => In case of any error, responds with HTTP 400 and the error message.
 * 
 */


import { Request, Response } from "express";
import { ServiceCompany } from "../service/comapany.service";
import { ServiceUser } from "../service/user.service";
import { Role } from "@prisma/client";
import { generateToken } from "../../../shared/token/token.jwt";
import { generateRefreshToken } from "../../../shared/token/token.jwt.refresh";
import { setAuthCookies } from "../../../shared/cookies/cookies.helper";
import { MessageMap } from "../../../shared/messages";

export class ControllerCompany {
  private serviceCompany = new ServiceCompany();
  private serviceUser = new ServiceUser();

  async register(
    request: Request,
    response: Response
  ) {
    try {
      const resqData = request.body;
      const dataCompany = {
        name: resqData.nameCompany,
        documentId: resqData.documentId,
        companyType: resqData.companyType,
      };

      const dataUser = {
        name: resqData.nameUser,
        email: resqData.email,
        password: resqData.password,
        role: Role.OWNER,
        documentIdCompany: resqData.documentId,
      };

      await this.serviceCompany.register(dataCompany);
      const user = await this.serviceUser.register(dataUser);

      const token = generateToken({
        id: user.documentIdCompany,
        email: user.email,
        role: user.role
      });

      const refreshToken = generateRefreshToken({
        id: user.documentIdCompany,
        email: user.email,
        role: user.role
      });

      setAuthCookies(
        response,
        token,
        refreshToken
      );

      return response.send({
        message: MessageMap.SUCCESS.CONTROLLER.COMPANY.REGISTER,
        user
      });


    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}