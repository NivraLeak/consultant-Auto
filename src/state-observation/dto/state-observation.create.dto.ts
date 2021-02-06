import { IsNotEmpty } from 'class-validator';
import { UserDto } from './../../user/dto/user.dto';

export class CreateStateObservationDto {
  @IsNotEmpty()
  name: string;
}