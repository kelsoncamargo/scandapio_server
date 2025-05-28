import { MessageMap } from "../../../shared/messages";
import { generateToken } from "../../../shared/token/token.jwt";
import { generateRefreshToken } from "../../../shared/token/token.jwt.refresh";
import { IAuthLogin, IAuthLoginDto } from "../interface/auth.login.interface";
import { loginRepository } from "../repo/auth.repo";

export const login = async (
  loginData: IAuthLogin
): Promise<IAuthLoginDto> => {
  const { documentId, email, password } = loginData

  const user = await loginRepository.login({
    documentId,
    email,
    password
  })

  const token = generateToken({
    id: user.id,
    documentId: user.documentId,
    email: user.email,
    role: user.role
  })

  const refreshToken = await generateRefreshToken({
    id: user.id,
    documentId: user.documentId,
    email: user.email,
    role: user.role
  })

  return {
    token,
    refreshToken
  }
}