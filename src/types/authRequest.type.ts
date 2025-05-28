import { IJwtPayload } from "../shared/token/token.jwt.interface";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: IJwtPayload;
}