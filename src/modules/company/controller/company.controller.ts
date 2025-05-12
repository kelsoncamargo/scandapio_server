/**
 * ControllerCompany
 * 
 * Handles HTTP requests related to Company registration.
 * 
 * Method:
 * - register(request: Request, response: Response): Promise<Response>
 *   => Extracts company data from the request body.
 *   => Calls ServiceCompany to register a new company.
 *   => Returns the created company data on success.
 *   => Returns HTTP 400 with error message on failure.
 */

import { Request, Response } from "express";
import { ServiceCompany } from "../service/comapany.service";
import { userService } from "../../user/service/user.service";
import { Role } from "@prisma/client";
import { setAuthCookies } from "../../../shared/cookies/cookies.helper";
import { MessageMap } from "../../../shared/messages";
import { generateToken } from "../../../utils/token";
import { generateRefreshToken } from "../../../shared/token/token.jwt.refresh";

export class ControllerCompany {
  private companyServive = new ServiceCompany();

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
        companyLicenseId: resqData.companyLicenseId
      };

      const dataUser = {
        name: resqData.nameUser,
        email: resqData.email,
        password: resqData.password,
        role: Role.OWNER,
        documentIdCompany: resqData.documentId,
      };

      await this.companyServive.register(dataCompany);

      const user = await userService.create(dataUser);

      const token = generateToken({
        id: user.documentIdCompany,
        email: user.email,
        role: user.role
      });

      const refreshToken = await generateRefreshToken({
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
        ...user
      });
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}