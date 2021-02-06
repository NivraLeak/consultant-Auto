import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './../user/services/user.service';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './../user/dto/create.user.dto';
import { LoginUserDto } from './../user/dto/login.user.dto';
import { UserDto } from './../user/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface'
import { jwtConstants } from './constants';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService  ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const user = await this.userService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: jwtConstants.expires,
            accessToken,    
        };  
    }


    async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);    
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    }    
    return user;  
}

}
