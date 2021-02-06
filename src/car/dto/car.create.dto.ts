import { IsNotEmpty } from 'class-validator';
import { UserDto } from './../../user/dto/user.dto';

export class CreateCarDto {
  @IsNotEmpty()
  vim: string;
}