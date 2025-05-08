/**
 * UserRepository
 *
 * Provides persistence operations for User entities.
 *
 * Operations:
 * - create
 * - get
 */

import { create } from "./user.create.repo";
import { get } from "./user.get.repo";

class UserRepository {
  create = create;
  get = get;
}

export const userRepository = new UserRepository();