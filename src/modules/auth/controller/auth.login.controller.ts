import { setAuthCookies } from "../../../shared/cookies/cookies.helper";
import { MessageMap } from "../../../shared/messages";
import { authService } from "../service/auth.service";
import { Request, Response } from "express";

export const login = async (
  request: Request,
  response: Response
) => {
  try {
    const reqData = request.body;

    const credentials = {
      documentId: reqData.documentId,
      email: reqData.email,
      password: reqData.Password
    };

    const tokens = await authService.login({
      documentId: credentials.documentId,
      email: credentials.email,
      password: credentials.password
    });

    setAuthCookies(response, tokens.token, tokens.refreshToken);

    return response.send({
      message: MessageMap.SUCCESS.MODULE.AUTH.LOGIN
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
}