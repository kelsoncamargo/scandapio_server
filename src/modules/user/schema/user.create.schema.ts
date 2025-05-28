/**
 * create
 *
 * Joi validation schema for user registration endpoint.
 *
 * @constant
 * @returns {Record<string, import('joi').ObjectSchema>}  
 *   Mapping of celebrate segment to the Joi object schema for registration.
 */

import { Segments, Joi } from "celebrate";
import { Role } from "@prisma/client";

export function create(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string()
          .trim()
          .email()
          .required()
          .messages({
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
          }),

        name: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be no more than 30 characters",
            "any.required": "Name is required",
          }),

        password: Joi.string()
          .trim()
          .min(6)
          .max(18)
          .required()
          .messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be no more than 18 characters",
            "any.required": "Password is required",
          }),

        role: Joi.string()
          .valid(...Object.values(Role))
          .required()
          .messages({
            "any.only": `Role must be one of: ${Object.values(Role).join(", ")}`,
            "any.required": "Role is required",
          }),
      })
      .unknown(),
  };
};