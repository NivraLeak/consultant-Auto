import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './../../user/dto/user.dto';
import { Car } from './../entities/car.entity';
import { UserService } from './../../user/services/user.service'

import { CarDto } from './../dto/car.dto';
import { toCarDto } from './../../shared/mapper';
import { CreateCarDto } from './../dto/car.create.dto';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car) private carRepo: Repository<Car>,
         private readonly userService: UserService,
    ) {}

    findAll() {
        return this.carRepo.find();
    }

    register(body: any) {
        const newCar = this.carRepo.create(body);
        return this.carRepo.save(newCar);
    }

    async createCar({ username }: UserDto, createcarDto: CreateCarDto, ): Promise<any> {
        const { vim } = createcarDto;
        
        // get the user from db    
        const owner = await this.userService.findOne({ where: { username } });
        const car: Car = await this.carRepo.create({ vim });
        await this.carRepo.save(car);
        
        return toCarDto(car);  
    }
}
