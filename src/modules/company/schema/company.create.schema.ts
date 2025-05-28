/**
 * @module controller.company.get
 * @description Express handler to retrieve company details by its document ID.
 *
 * @function get
 * @param {import("express").Request} req – Express request object with `body.documentId` (string): the company's document identifier.
 * @param {import("express").Response} res – Express response object.
 *
 * @returns {Promise<import("express").Response>}  
 *   Sends 200 OK with the company data on success.
 *
 * @throws {400 Bad Request}  
 *   Responds with status 400 and `{ message: string }` when an error occurs.
 */


import { Segments, Joi } from "celebrate";
import { cnpj } from "cpf-cnpj-validator";
import { CompanyType } from "@prisma/client";

export function create(): object {
  const companyTypes = Object.values(CompanyType) as string[];

  return {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string()
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
            if (!cnpj.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "any.required": "Document ID is required",
            "any.invalid": "Document ID must be a valid CNPJ",
          }),

        companyType: Joi.string()
          .trim()
          .valid(...companyTypes)
          .required()
          .messages({
            "any.only": `Company type must be one of: ${companyTypes.join(
              ", "
            )}`,
            "any.required": "Company type is required",
          }),
      })
      .unknown(),
  };
}
