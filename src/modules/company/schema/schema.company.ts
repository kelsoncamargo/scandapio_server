/**
 * SchemaCompany
 * 
 * Defines validation schemas for Company-related HTTP requests using Celebrate (Joi).
 * 
 * Properties:
 * - register: Validates the request body for company registration.
 *   => Includes fields like name, documentId, companyType, user details, and companyLicenseId.
 */

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

        companyLicenseId: Joi.string()
          .uuid()
          .required()
          .messages({
            "string.base": "License ID must be a string",
            "string.guid": "License ID must be a valid UUID",
            "any.required": "License ID is required",
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
      })
      .unknown(),
  };
}
