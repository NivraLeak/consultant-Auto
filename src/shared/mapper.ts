import { User } from './../user/entities/user.entity';
import { UserDto } from './../user/dto/userDto';

export const toUserDto = (data: User): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};