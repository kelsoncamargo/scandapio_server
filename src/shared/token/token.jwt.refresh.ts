/**
 * Refresh Token Utilities
 * 
 * Functions to generate and validate JWT refresh tokens.
 * 
 * Environment Variables:
 * - PRODUCTION: "true" or "false"
 * - JWT_SECRET_REFRESH (for production)
 * - JWT_SECRET_DEV_REFRESH (for development)
 * 
 * Functions:
 * - generateRefreshToken(payload: IJwtPayload): string
 *   => Creates a refresh token valid for 7 days.
 * 
 * - validateRefreshToken(token: string): IJwtPayload
 *   => Verifies and decodes a refresh token.
 *   => Throws an error if invalid or expired.
 * 
 */
import jwt from "jsonwebtoken";
import { IJwtPayload } from "./token.jwt.interface";
import dotenv from "dotenv";
import { MessageMap } from "../messages";

dotenv.config();

const isProduction = process.env.PRODUCTION === "true"
const secret = (isProduction ? process.env.JWT_SECRET_REFRESH : process.env.JWT_SECRET_DEV_REFRESH) as string;

if (!secret) {
  throw new Error(MessageMap.ERROR.TOKEN.NO_SECRET);
}

export const generateRefreshToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const validateRefreshToken = (token: string): IJwtPayload => {
  try {
    return jwt.verify(token, secret) as IJwtPayload;
  } catch (error) {
    throw new Error(MessageMap.ERROR.TOKEN.INVALID);
  }
};