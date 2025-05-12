/**
 * Token Utilities
 * 
 * Provides functions to generate and validate JWT tokens.
 * Requires environment variables: PRODUCTION, JWT_SECRET, JWT_SECRET_DEV.
 * 
 * Functions:
 * - generateToken(payload: IJwtPayload): string
 * - verifyToken(token: string): IJwtPayload
 */
import jwt from "jsonwebtoken";
import { IJwtPayload } from "./token.jwt.interface";
import dotenv from "dotenv";
import { MessageMap } from "../messages";

dotenv.config();

const isProduction = process.env.PRODUCTION === "true"
const secret = (isProduction
  ? process.env.JWT_SECRET
  : process.env.JWT_SECRET_DEV) as string;

if (!secret) {
  throw new Error(MessageMap.ERROR.SHARED.TOKEN.NO_SECRET);
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): IJwtPayload => {
  try {
    return jwt.verify(token, secret) as IJwtPayload;
  } catch (error) {
    throw new Error(MessageMap.ERROR.SHARED.TOKEN.INVALID);
  }
};