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

    async findAll({ username }: UserDto) {
        const owner = await this.userService.findOne({ where: { username } });
        const cars: Car[] = await this.carRepo.find();

        return cars;
    }

    async findOne(options?: object): Promise<CarDto> {
        const car =  await this.carRepo.findOne(options);    
        return toCarDto(car);  
    }


    async createCar({ username }: UserDto, createcarDto: CreateCarDto, ): Promise<any> {
        const { vim } = createcarDto;
           
        const owner = await this.userService.findOne({ where: { username } });
        const car: Car = await this.carRepo.create({ vim });
        await this.carRepo.save(car);
        
        return toCarDto(car);  
    }
}
