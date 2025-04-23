import { Segments, Joi } from "celebrate";

export const login = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .trim()
      .email()
      .required()
      .messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
      }),
    password: Joi.string()
      .trim()
      .required()
      .min(6)
      .max(18)
      .messages({
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be no more than 18 characters",
        "any.required": "Password is required",
      }),
  }),
};