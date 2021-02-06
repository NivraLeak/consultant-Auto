import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserDto } from './../user/dto/userDto';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthService } from './auth.service'
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
        });  
    }
    
    async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
