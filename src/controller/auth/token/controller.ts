import { Request, Response } from "express";

import TokenService from "./service";

export const tokenController = async (request: Request, response: Response) => {
  try {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (!token) return;
      const user = await TokenService.validate({ token: String(token) });
      return response.send(user);
    }
  } catch (err) {
    return response.status(401).send({ message: err });
  }
};
