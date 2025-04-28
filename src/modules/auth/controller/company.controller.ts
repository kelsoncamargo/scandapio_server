import { Request, Response } from "express";
import { ServiceCompany } from "../service/comapany.service";
import { ServiceUser } from "../service/user.service";
import { Role } from "@prisma/client";
import { generateToken } from "../../../utils/token";

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
      await this.serviceUser.register(dataUser);

      return response.send(generateToken({

      }));
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}