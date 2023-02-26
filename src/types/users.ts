import { RolesEnum } from './roles';

export interface IUsers {
  _id: string;
  email: string;
  username: string;
  banStatus: boolean;
  roles: RolesEnum;
}

export interface IUsersFromApi {
  users: IUsers[];
  totalCount: number;
}
