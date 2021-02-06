import { IsNotEmpty } from 'class-validator';
import { Car } from './../../car/entities/car.entity';
import { StateObservation } from './../../state-observation/entities/state-observation.entity';
import { User } from './../../user/entities/user.entity';

export class ObservationDto {
  @IsNotEmpty()
  id: number;

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