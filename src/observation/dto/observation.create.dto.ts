import { IsNotEmpty } from 'class-validator';
import { UserDto } from './../../user/dto/user.dto';
import { Car } from './../../car/entities/car.entity';
import { StateObservation } from './../../state-observation/entities/state-observation.entity';
import { User } from './../../user/entities/user.entity';

export class CreateObservationDto {
  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  car: Car;

  @IsNotEmpty()
  stateObservation: StateObservation;

  @IsNotEmpty()
  userCreator: User;

  @IsNotEmpty()
  userResolve: User;
}