import { IAccountDTO } from "../../../shared/interfaces/account";
import { encryptPassword } from "../../../utils/password";
import { update } from "./database";
import { IUpdateProps } from "./interface";

class UpdateServiceAccount {
  async update(
    id: string,
    { fullName, phone, email, password, role }: Partial<IUpdateProps>
  ): Promise<IAccountDTO> {
    const dataToUpdate: Partial<IUpdateProps> = {};

    if (fullName) dataToUpdate.fullName = fullName;
    if (phone) dataToUpdate.phone = phone;
    if (email) dataToUpdate.email = email;
    if (role) dataToUpdate.role = role;
    if (password) {
      dataToUpdate.password = await encryptPassword(password);
    }

    return await update(id, dataToUpdate);
  }

}

export default new UpdateServiceAccount();
