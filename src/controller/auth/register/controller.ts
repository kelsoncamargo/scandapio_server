import { Request, Response } from "express";
import RegisterServiceCompany from "./service";
import { validateToken } from "../../../utils/token";
import { MessageMap } from "../../../utils/message";


export const registerController = async (
  request: Request,
  response: Response
) => {
  try {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (!token) return;
      const account = await validateToken({ token });
      if (account.role === 'FULL') {
        const restData = request.body;
        const account = await RegisterServiceCompany.register(restData);

        return response.send({ account });
      }
      return response.status(401).send({ message: `${MessageMap.ERROR.NOT_HAVE_PERMISSIONS}` });
    }
  } catch (error: any) {
    return response.status(401).send({ message: error.message });
  }
};
