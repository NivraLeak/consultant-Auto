import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from './../entities/car.entity';


@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car) private carRepo: Repository<Car>
    ) {}

    findAll() {
        return this.carRepo.find();
    }

    register(body: any) {
        const newCar = this.carRepo.create(body);
        return this.carRepo.save(newCar);
    }


}
