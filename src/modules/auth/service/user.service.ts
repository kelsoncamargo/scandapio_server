import {
  RegisterUserRepository
} from "../repo/user.repo";
import {
  IRegisterUser,
  IRegisterUserDto
} from "../interface/user.interface";
import { MessageMap } from "../../../utils/message";


export class ServiceUser {

  private userRepository = new RegisterUserRepository();

  async register({
    documentIdCompany,
    email,
    name,
    password,
    role
  }: IRegisterUser): Promise<IRegisterUserDto> {

    const companyExists = await this.userRepository.findUserByEmail(email, documentIdCompany);
    if (companyExists) {
      throw new Error(MessageMap.ERROR.COMPANY.STATUS.REGISTER);
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