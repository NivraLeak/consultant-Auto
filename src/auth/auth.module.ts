import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { jwtConstants } from './constants';
@Module({  
    imports: [    
        UserModule,    
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: jwtConstants.secret, signOptions: {
                expiresIn: jwtConstants.expires,
            },
        }),
    ], 
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [
        PassportModule, 
        JwtModule
    ],
})
export class AuthModule {}
