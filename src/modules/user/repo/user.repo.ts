/**
 * @module repository.user
 * @description Aggregates persistence operations for User entities by delegating to specialized repository functions.
 *
 * @function create
 * @param {import("../interface/user.interface").ICreateUser} data – Payload containing details to create a new user.
 * @returns {Promise<import("../interface/user.interface").ICreateUserDto>} Resolves with creation result and metadata.
 * @throws {Error} Throws on database failure.
 *
 * @function get
 * @param {string} id – Unique identifier of the user to retrieve.
 * @returns {Promise<import("../interface/user.interface").IGetUserDto>} Resolves with user details.
 * @throws {Error} Throws if user not found or on database error.
 */


import { create } from "./user.create.repo";
import { get } from "./user.get.repo";

class UserRepository {
  create = create;
  get = get;
}

export const userRepository = new UserRepository();