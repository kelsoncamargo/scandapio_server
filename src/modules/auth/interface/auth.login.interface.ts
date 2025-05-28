
export interface IAuthLogin {
  documentId: string;
  email: string;
  password: string;
}

export interface IAuthLoginDto {
  token: string;
  refreshToken: string;
}