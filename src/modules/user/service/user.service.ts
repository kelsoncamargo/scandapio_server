/**
 * ServiceUser
 * 
 * Service class responsible for handling business logic related to User registration.
 * 
 * Methods:
 * 
 * - register({ documentId, email, name, password, role }: IRegisterUser): Promise<IRegisterUserDto>
 *   => Checks if a user with the given email already exists in the specified company.
 *   => If the user exists, throws an error (MessageMap.ERROR.REPO.REGISTER.ALREADY.USER).
 *   => If the user does not exist, creates a new user using RegisterUserRepository.
 * 
 */

import { create } from "./user.create.service";
import { get } from "./user.get.service";

class UserService {
  create = create;
  get = get;
}

export const userService = new UserService();