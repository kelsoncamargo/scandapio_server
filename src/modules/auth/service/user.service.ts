/**
 * ServiceUser
 * 
 * Service class responsible for handling business logic related to User registration.
 * 
 * Methods:
 * 
 * - register({ documentIdCompany, email, name, password, role }: IRegisterUser): Promise<IRegisterUserDto>
 *   => Checks if a user with the given email already exists in the specified company.
 *   => If the user exists, throws an error (MessageMap.ERROR.REPO.REGISTER.ALREADY.USER).
 *   => If the user does not exist, creates a new user using RegisterUserRepository.
 * 
 */

import {
  RegisterUserRepository
} from "../repo/user.repo";
import {
  IRegisterUser,
  IRegisterUserDto
} from "../interface/user.interface";
import { MessageMap } from "../../../shared/messages";


export class ServiceUser {

  private userRepository = new RegisterUserRepository();

  async register({
    documentIdCompany,
    email,
    name,
    password,
    role
  }: IRegisterUser): Promise<IRegisterUserDto> {

    const userExists = await this.userRepository.findUserByEmail(email, documentIdCompany);
    if (userExists) {
      throw new Error(MessageMap.ERROR.REPO.REGISTER.ALREADY.USER);
    }

    return await this.userRepository.createUser({
      documentIdCompany,
      email,
      name,
      password,
      role
    });
  }
}