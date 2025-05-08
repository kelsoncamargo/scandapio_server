/**
 * SchemaPlan
 * 
 * Defines validation schemas for Plan-related HTTP requests using Celebrate (Joi).
 * 
 * Properties:
 * - register: Validates the request body for plan creation.
 *   => Requires a valid UUID for companyId.
 *   => Requires a licenseName between 3 and 30 characters.
 * 
 * - get: Validates the request parameters to retrieve a plan.
 *   => Requires a valid UUID for planId.
 */

import { Segments, Joi } from "celebrate";

export class PlanSchema {
  register = {
    [Segments.BODY]: Joi.object()
      .keys({
        companyId: Joi.string()
          .uuid()
          .required()
          .messages({
            "string.base": "Company ID must be a string",
            "string.guid": "Company ID must be a valid UUID",
            "any.required": "Company ID is required",
          }),

        licenseName: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.base": "License name must be a string",
            "string.min": "License name must be at least 3 characters",
            "string.max": "License name must be no more than 30 characters",
            "any.required": "License name is required",
          }),
      })
      .unknown(),
  };

  get = {
    [Segments.PARAMS]: Joi.object()
      .keys({
        planId: Joi.string()
          .uuid()
          .required()
          .messages({
            "string.base": "Plan ID must be a string",
            "string.guid": "Plan ID must be a valid UUID",
            "any.required": "Plan ID is required",
          }),
      }),
  };
}
