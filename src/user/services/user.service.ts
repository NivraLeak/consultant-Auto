import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../entities/user.entity';
import { UserDto } from "./../dto/userDto";
import { LoginUserDto } from "./../dto/loginUserDto";
import { CreateUserDto } from "./../dto/createUserDto";
import { toUserDto } from "./../../shared/mapper";

import { comparePasswords } from './../../shared/utils';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private  readonly  userRepo: Repository<User>
    ) {}

    findAll() {
        return this.userRepo.find();
    }

    //findone Authenticacion
    async findOne(options?: object): Promise<UserDto> {
        const user =  await this.userRepo.findOne(options);    
        return toUserDto(user);  
    }

    comparePasswords(user, password) {
        return user.password == password;
    }
    
    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepo.findOne({ where: { username } });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        
        // compare passwords    
        const areEqual = await comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }


    
    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ 
            where:  { username } });  
    }


    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email } = userDto;
    
        // check if the user exists in the db    
        const userInDb = await this.userRepo.findOne({ 
            where: { username } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const user: User = await this.userRepo.create({ username, password, email, });
        await this.userRepo.save(user);
        return toUserDto(user);  
    }


    // findone Anterior
    async findOnetest(body: any) {
        let logeado = false
        const user = await this.userRepo.find({username: body.username, password:body.password})

        return user.length > 0;
    }

    register(body: any) {
        const newUser = this.userRepo.create(body);
        return this.userRepo.save(newUser);
    }

    async delete( id: number ) {
        await this.userRepo.delete(id);
        return true;
    }    
}
