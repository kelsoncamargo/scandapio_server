/**
 * SchemaUser
 *
 * Aggregates Joi validation schemas for User-related endpoints.
 *
 * @class
 * @property {Record<string, import('joi').ObjectSchema>} create  
 *   Schema for user registration.
 * @property {Record<string, import('joi').ObjectSchema>} get     
 *   Schema for fetching a user by email and company ID.
 */

import { create } from "./user.create.schema";
import { get } from "./user.get.schema";

class SchemaUser {
  create = create;
  get = get;
}

export const schemaUser = new SchemaUser();