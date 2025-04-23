import { Request, Response } from "express";
import { RegisterServiceCompany, RegisterServiceUser } from "./auth.service";
import { validateToken } from "../../utils/token";
import { MessageMap } from "../../utils/message";
import { Role } from "@prisma/client";

export const registerCompanyController = async (
  request: Request,
  response: Response
) => {
  try {
    const restData = request.body;
    const registerServiceCompany = new RegisterServiceCompany();
    const registerServiceUser = new RegisterServiceUser();

    const dataCompany = {
      name: restData.nameCompany,
      documentId: restData.documentId,
      companyType: restData.companyType,
    };

    const dataUser = {
      name: restData.nameUser,
      email: restData.email,
      password: restData.password,
      role: restData.role,
      documentIdCompany: restData.documentId,
    };

    await registerServiceCompany.register(dataCompany);
    const account = await registerServiceUser.register(dataUser);

    return response.status(201).send({ account });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};

export const registerUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return response
        .status(401)
        .json({ message: MessageMap.ERROR.INVALID_TOKEN });
    }

    const token = authHeader.split(" ")[1];
    const account = await validateToken({ token });

    if (account.role !== Role.ADMIN) {
      return response
        .status(403)
        .send({ message: MessageMap.ERROR.NOT_HAVE_PERMISSIONS });
    }

    const restData = request.body;
    const registerServiceUser = new RegisterServiceUser();
    const accountCreated = await registerServiceUser.register(restData);

    return response.status(201).send({ account: accountCreated });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
