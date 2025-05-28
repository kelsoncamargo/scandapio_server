/**
 * LicenseSchema
 * 
 * Defines validation schemas for License-related HTTP requests using Celebrate (Joi).
 * 
 * Properties:
 * - get: Validates the request body for license retrieval.
 *   => Requires a valid licenseName matching the License enum.
 */

import { Segments, Joi } from "celebrate";
import { License } from "@prisma/client";

export class LicenseSchema {
  get = {
    [Segments.BODY]: Joi.object()
      .keys({
        licenseName: Joi.string()
          .valid(...Object.values(License))
          .required()
          .messages({
            "string.base": "License name must be a string",
            "any.only": `License name must be one of: ${Object.values(License).join(", ")}`,
            "any.required": "License name is required",
          }),
      })
      .unknown(),
  };
}
