import { RolesEnum } from './roles';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IAuth extends Tokens {
  role: RolesEnum | null;
  username: string | null;
  banStatus: boolean | null;
  id: string | null;
}

export interface IAuthApi {
  id: string;
  banStatus: boolean;
  role: RolesEnum;
  username: string;
  tokens: Tokens;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  username: string;
}
