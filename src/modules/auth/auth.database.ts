import { MessageMap } from "../../utils/message";
import database from "../../config/database";
import { validateErrorType } from "../../utils/validateErrorType";
import { decryptPassword } from "../../utils/password";
import {
  IDeleteUser,
  ILoginUser,
  ILoginUserDatabase,
  IRegisterCompany,
  IRegisterUser,
  IRegisterUserDto,
  IUpdateUser,
  IUpdateUserDto
} from "./auth.interface";

export const registerCompany = async ({
  documentId,
  name,
  companyType,
}: IRegisterCompany): Promise<any> => {
  try {
    const company = await database.company.findUnique({
      where: { documentId: documentId },
    });

    if (company) {
      throw new Error(MessageMap.ERROR.COMPANY.STATUS.REGISTER);
    }

    await database.company.create({
      data: {
        documentId,
        name,
        companyType,
      },
    });
    return MessageMap.SUCCESS.COMPANY.SUCESS_MESSAGE.REGISTER;
  } catch (err) {
    validateErrorType(err);
    throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
  }
};

export const registerUser = async ({
  documentIdCompany,
  email,
  password,
  name,
  role,
}: IRegisterUser): Promise<IRegisterUserDto> => {
  try {
    const company = await database.company.findUnique({
      where: { documentId: documentIdCompany },
    });

    if (!company) {
      throw new Error(MessageMap.ERROR.DOCUMENT_INCORRET);
    }


    return await database.user.create({
      data: {
        companyId: company.id,
        documentIdCompany,
        email,
        name,
        password,
        role,
      },
      select: {
        name: true,
        email: true,
        role: true,
      },
    });
  } catch (err) {
    validateErrorType(err);
    throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
  }
};

export const loginUser = async ({
  documentIdCompany,
  email,
  password
}: ILoginUser): Promise<ILoginUserDatabase> => {
  const account = await database.user.findFirst({
    where: {
      documentIdCompany,
      email,
    },
  });

  if (!account) {
    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }

  const isPasswordValid = await decryptPassword(password, account.password);
  if (!isPasswordValid) {
    throw new Error(MessageMap.ERROR.EMAIL_OR_PASSWORD_INCORRECT);
  }

  return {
    id: account.id,
    email: account.email,
    role: account.role,
  };
};

export const updateUser = async ({
  id,
  email,
  name,
  password,
  role
}: IUpdateUser): Promise<IUpdateUserDto> => {
  const account = await database.user.update({
    where: {
      id
    },
    data: {
      email: email != null ? email : undefined,
      name: name != null ? name : undefined,
      password: password != null ? password : undefined,
      role: role != null ? role : undefined
    },
    select: {
      email: true,
      name: true,
      role: true
    }
  })

  if (!account) {
    throw new Error(MessageMap.ERROR.USER_NOT_FOUND);
  }

  return account;
}

export const deleteUser = async ({
  id
}: IDeleteUser): Promise<String> => {
  const account = await database.user.delete({
    where: {
      id
    },
  });

  if (!account) {
    throw new Error(MessageMap.ERROR.USER_NOT_FOUND);
  };

  return MessageMap.SUCCESS.USER.DELETE;
}