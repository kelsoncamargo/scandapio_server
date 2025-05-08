/**
 * UserController
 *
 * Provides HTTP endpoints for user creation and authentication.
 *
 * Operations:
 * - create
 * - get
 */

import { create } from "./user.create.controller";
import { get } from "./user.get.controller";

export class UserController {
  create = create;
  get = get;
}

export const userController = new UserController();