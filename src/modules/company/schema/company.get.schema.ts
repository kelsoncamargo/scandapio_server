/**
 * @module schema.company
 * @description Provides validation schema for the company registration endpoint.
*
* @function getRegisterSchema
* @returns {object} A mapping of Celebrate segments to Joi validation schemas.
*   - [Segments.BODY]: Joi schema requiring:
*     • documentId: valid CNPJ string  
*/

import { Segments, Joi } from "celebrate";
import { cnpj } from "cpf-cnpj-validator";

export function get(): object {
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
          })
      })
      .unknown(),
  };
}