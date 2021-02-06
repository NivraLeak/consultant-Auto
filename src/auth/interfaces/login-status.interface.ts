import { UserDto } from './../../user/dto/userDto';

export interface LoginStatus {
  username: string;
  accessToken: any;
  expiresIn: any;
}