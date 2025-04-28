/**
 * SchemaCompany
 * 
 * Class responsible for defining Joi validation schemas for Company-related requests.
 * 
 * Properties:
 * 
 * - register
 *   => Validation schema for company and first user registration.
 *   => Validates:
 *      - nameCompany: String, required, 3-30 characters.
 *      - documentId: String, required, must be a valid CPF or CNPJ.
 *      - companyType: String, required.
 *      - nameUser: String, required, 3-30 characters.
 *      - email: String, required, valid email format.
 *      - password: String, required, 6-18 characters.
 *      - role: String, required, must match one of the Role enum values from Prisma.
 *   => Uses celebrate's Segments.BODY to target request body validation.
 *   => Allows unknown fields outside the defined ones.
 * 
 */

import { Role } from "@prisma/client";
import { Segments, Joi } from "celebrate";
import { cpf, cnpj } from "cpf-cnpj-validator";

export class SchemaCompany {
  register = {
    [Segments.BODY]: Joi.object()
      .keys({
        nameCompany: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.base": "Company name must be a string",
            "string.min": "Company name must be at least 3 characters",
            "string.max": "Company name must be no more than 30 characters",
            "any.required": "Company name is required",
          }),

        documentId: Joi.string()
          .trim()
          .required()
          .custom((value, helpers) => {
            if (!cpf.isValid(value) && !cnpj.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "any.required": "Document ID is required",
            "any.invalid": "Document ID must be a valid CPF or CNPJ",
          }),

        companyType: Joi.string()
          .trim()
          .required()
          .messages({
            "any.required": "Company type is required",
          }),

        nameUser: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.min": "User name must be at least 3 characters",
            "string.max": "User name must be no more than 30 characters",
            "any.required": "User name is required",
          }),

        email: Joi.string()
          .trim()
          .email()
          .required()
          .messages({
            "string.email": "Email must be valid",
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

        role: Joi.string()
          .trim()
          .valid(...Object.values(Role))
          .required()
          .messages({
            "any.only": `Role must be one of ${Object.values(Role).join(", ")}`,
            "any.required": "Role is required",
          }),
      })
      .unknown(),
  };

}
