/**
 * update
 *
 * Returns a Joi validation schema for updating a company’s fields.
 *
 * The schema validates (all fields optional but at least one required):
 * - `name` (string): trimmed, between 3 and 30 characters.
 * - `documentId` (string): trimmed, must be a valid CNPJ.
 * - `companyType` (string): trimmed, must match one of the Prisma CompanyType values.
 *
 * @returns {object}
 *   Celebrate validation schema for request body:
 *   • At least one of `name`, `documentId`, or `companyType` must be provided.
 */


import { Segments, Joi } from "celebrate";
import { cnpj } from "cpf-cnpj-validator";
import { CompanyType } from "@prisma/client";

export function update(): object {
  const companyTypes = Object.values(CompanyType) as string[];

  return {
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .messages({
            "string.base": "Company name must be a string",
            "string.min": "Company name must be at least 3 characters",
            "string.max": "Company name must be no more than 30 characters",
          }),

        documentId: Joi.string()
          .trim()
          .custom((value, helpers) => {
            if (!cnpj.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "any.invalid": "Document ID must be a valid CNPJ",
          }),

        companyType: Joi.string()
          .trim()
          .valid(...companyTypes)
          .messages({
            "any.only": `Company type must be one of: ${companyTypes.join(", ")}`,
          }),
      })
      .or("name", "documentId", "companyType")
      .messages({
        "object.missing": "At least one field (name, documentId, companyType) must be provided",
      }),
  };
}
