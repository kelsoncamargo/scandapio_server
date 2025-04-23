import { Request, Response } from "express";

import LoginService from "./service";

export const loginController = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await LoginService.getLogin({ email, password });
    return response.send({ token: user });
  } catch (error: any) {
    return response.status(401).send({ message: error.message });
  }
};
