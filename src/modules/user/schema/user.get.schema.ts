/**
 * get
*
* Joi validation schema for fetching a user by email and company document ID.
*
* @constant
* @returns {Record<string, import('joi').ObjectSchema>}  
*   Mapping of celebrate segment to the Joi object schema for lookup.
*/

import { Joi, Segments } from "celebrate";

export function get(): object {
  return {

    [Segments.QUERY]: Joi.object()
      .keys({
        email: Joi.string()
          .trim()
          .email()
          .required()
          .messages({
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
          }),

        documentId: Joi.string()
          .trim()
          .required()
          .messages({
            "string.base": "documentId must be a string",
            "any.required": "documentId is required",
          }),
      })
      .unknown(),
  };
};