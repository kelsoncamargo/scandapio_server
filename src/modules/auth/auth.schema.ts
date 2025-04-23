import { Role } from "@prisma/client";
import { Segments, Joi } from "celebrate";

/**
 * Schema for registering a standalone user
 * Requires company to already exist
 */
const SchameRegisterUser = {
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
          "string.base": "Name must be a string",
          "string.min": "Name must be at least 3 characters",
          "string.max": "Name must be no more than 30 characters",
          "any.required": "Name is required",
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
      role: Joi.string()
        .trim()
        .valid(...Object.values(Role))
        .required()
        .messages({
          "any.only": `Role must be one of ${Object.values(Role).join(", ")}`,
          "any.required": "Role is required",
        }),
      documentIdCompany: Joi.string()
        .trim()
        .required()
        .messages({
          "any.required": "Document ID of the company is required",
        }),
    })
    .unknown(),
};

/**
 * Schema for registering a company with its first admin user
 */
const SchameRegisterCompany = {
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
        .messages({
          "any.required": "Document ID is required",
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

export { SchameRegisterUser, SchameRegisterCompany };
