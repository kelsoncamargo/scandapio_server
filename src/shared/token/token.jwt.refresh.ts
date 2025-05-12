/**
 * Refresh Token Utilities
 * 
 * Utility functions to manage secure creation, validation, and revocation of JWT refresh tokens.
 * 
 * Environment Variables:
 * - PRODUCTION: "true" or "false"
 * - JWT_SECRET_REFRESH: Secret key for production refresh tokens
 * - JWT_SECRET_DEV_REFRESH: Secret key for development refresh tokens
 * 
 * Functions:
 * 
 * - generateRefreshToken(payload: IJwtPayload): Promise<string>
 *   => Signs a refresh token (valid for 7 days) using HS256.
 *   => Hashes and stores the token in the database.
 *   => Returns the original (non-hashed) token.
 * 
 * - validateRefreshToken(token: string): Promise<IJwtPayload>
 *   => Verifies token signature and checks if it's stored and not revoked.
 *   => Throws standardized error if token is invalid or not found.
 * 
 * - revokeRefreshToken(token: string): Promise<boolean>
 *   => Hashes and marks the refresh token as revoked in the database.
 *   => Returns `true` if updated; `false` if not found (handled via Prisma error code P2025).
 * 
 * Internals:
 * - hashToken(token: string): string
 *   => Hashes a token using SHA-256 for secure DB storage.
 * 
 */
import jwt from "jsonwebtoken";
import { IJwtPayload } from "./token.jwt.interface";
import dotenv from "dotenv";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import database from "../../config/database";
import { MessageMap } from "../messages";

dotenv.config();

const isProduction = process.env.PRODUCTION === "true"
const secret = (isProduction
  ? process.env.JWT_SECRET_REFRESH
  : process.env.JWT_SECRET_DEV_REFRESH) as string;

if (!secret) {
  throw new Error(MessageMap.ERROR.SHARED.TOKEN.NO_SECRET);
}

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const generateRefreshToken = async (payload: IJwtPayload): Promise<string> => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
  const hashed = hashToken(token);

  await database.refreshToken.create({
    data: {
      userId: payload.id,
      token: hashed,
    }
  });

  return token;
};

export const validateRefreshToken = async (token: string): Promise<IJwtPayload> => {
  try {
    const jwtDecoded = jwt.verify(token, secret) as IJwtPayload;
    const hashed = hashToken(token);

    const isValid = await database.refreshToken.findFirst({
      where: {
        token: hashed,
        revoked: false,
      }
    });

    if (!isValid) {
      throw new Error(MessageMap.ERROR.SHARED.TOKEN.INVALID);
    }

    return jwtDecoded;
  } catch (error) {
    throw new Error(MessageMap.ERROR.SHARED.TOKEN.INVALID);
  }
};

export const revokeRefreshToken = async (token: string) => {
  const hashed = hashToken(token);
  try {
    await database.refreshToken.update({
      where: { token: hashed },
      data: { revoked: true }
    });
    return true;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      throw new Error(MessageMap.ERROR.SHARED.TOKEN.INVALID);
    }
    throw new Error(MessageMap.ERROR.MODULE.DATABASE);
  }
}