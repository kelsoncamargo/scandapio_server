import { Request, Response } from "express";
import UpdateServiceAccount from "./service"
import { validateToken } from "../../../utils/token";
import { MessageMap } from "../../../utils/message";

export const updateController = async (request: Request, response: Response) => {
  try {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = await validateToken({ token });
      if (decoded.role !== "FULL") {
        return response.status(401).send({
          message: MessageMap.ERROR.NOT_HAVE_PERMISSIONS,
        });
      }

      const { id } = request.params;
      const restData = request.body;
      const updatedAccount = await UpdateServiceAccount.update(id, restData);
      return response.send({ account: updatedAccount });
    }
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};