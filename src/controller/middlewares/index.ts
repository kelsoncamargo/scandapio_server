import { NextFunction, Request, Response } from "express";
import { MessageMap } from "../../utils/message";
import { validateToken } from "../../utils/token";
import { getAccount } from "../../utils/account";
import { schema } from "./schema";

export const middlewares = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const { error } = schema.headers.validate(request.headers);
  if (error) {
    response.status(401).send({
      message: error.details[0]?.message || MessageMap.ERROR.NO_HAVE_TOKEN,
    });
    return;
  }

  const authHeader = request.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const hasToken = await validateToken({ token });
      if (hasToken) {
        await getAccount(hasToken);
        request.body = {
          ...request.body,
          emailRequest: hasToken.email,
          idRequest: hasToken.id,
        };
        return next();
      }
    } catch (err) {
      response.status(401).send({ message: err });
      return;
    }
  }
  response.status(401).send({ message: MessageMap.ERROR.NO_HAVE_TOKEN });
  return;
};