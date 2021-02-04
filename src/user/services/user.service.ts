import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    findAll() {
        return this.userRepo.find();
    }

    async findOne(body: any) {
        let logeado = false
        const user = await this.userRepo.find({username: body.username, password:body.password})

        return user.length > 0;
    }

    register(body: any) {
        const newUser = this.userRepo.create(body);
        return this.userRepo.save(newUser);
    }
}
