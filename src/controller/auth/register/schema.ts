import { AccountRole } from "@prisma/client";
import { Segments, Joi } from "celebrate";

const register = {
  [Segments.BODY]: Joi.object()
    .keys({
      fullName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
          "any.required": "full name is required",
        }),
      email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
          "string.email": "Email must be a valid email address",
          "any.required": "Email is required",
        }),
      phone: Joi.string()
        .trim()
        .pattern(/^\d{13}$/)
        .required()
        .messages({
          "string.pattern.base": "Phone must be a valid number with exactly 13 digits",
          "any.required": "Phone is required",
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
        .trim()
        .valid(...Object.values(AccountRole))
        .required()
        .messages({
          "any.only": `Role must be one of ${Object.values(AccountRole).join(", ")}`,
          "any.required": "Role is required",
        })
    })
    .unknown(),
};

export { register, register as schema }