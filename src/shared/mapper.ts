import { User } from './../user/entities/user.entity';
import { UserDto } from './../user/dto/user.dto';
import { Car } from './../car/entities/car.entity';
import { CarDto } from './../car/dto/car.dto';
import { StateObservation } from './../state-observation/entities/state-observation.entity';
import { StateObservationDto } from './../state-observation/dto/state-observation.dto';
import { Observation } from './../observation/entities/observation.entity';
import { ObservationDto } from './../observation/dto/observation.dto';


export const toUserDto = (data: User): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};

export const toCarDto = (data: Car): CarDto => {
  const { id, vim } = data;

  let carDto: CarDto = {
    id,
    vim
  };

  return carDto;
};

export const toStateObservationDto = (data: StateObservation): StateObservationDto => {
  const { id, name } = data;

  let stateObservationDto: StateObservationDto = {
    id,
    name
  };

  return stateObservationDto;
};

export const toObservationDto = (data: Observation): ObservationDto => {
  const { id, detail, car, stateObservation, userCreator, userResolve } = data;

  let observationDto: ObservationDto = {
    id,
    detail,
    car,
    stateObservation,
    userCreator,
    userResolve
  };

  return observationDto;
};