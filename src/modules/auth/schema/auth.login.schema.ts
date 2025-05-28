import { Segments, Joi } from "celebrate";
import { cnpj } from "cpf-cnpj-validator";

export function login(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        documentId: Joi.string()
          .trim()
          .required()
          .custom((value, helpers) => {
            if (!cnpj.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "any.required": "Document ID is required",
            "any.invalid": "Document ID must be a valid CNPJ",
          }),

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
          .min(6)
          .max(18)
          .required()
          .messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be no more than 18 characters",
            "any.required": "Password is required",
          }),
      })
      .unknown(),
  };
};