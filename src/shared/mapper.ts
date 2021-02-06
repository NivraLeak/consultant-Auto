import { User } from './../user/entities/user.entity';
import { UserDto } from './../user/dto/user.dto';
import { Car } from './../car/entities/car.entity';
import { CarDto } from './../car/dto/car.dto';

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