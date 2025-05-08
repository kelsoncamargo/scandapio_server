/**
 * Auth Cookies Utility
 * 
 * Functions to set and clear authentication cookies (accessToken, refreshToken).
 * 
 * Usage:
 * - setAuthCookies(res, accessToken, refreshToken)
 * - clearAuthCookies(res)
 * 
 * Environment:
 * - Requires PRODUCTION=true|false in .env
 */

import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.PRODUCTION === "true"

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60  // 1 hour
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  })
}

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken')
}