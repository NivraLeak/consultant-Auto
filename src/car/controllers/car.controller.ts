import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarService } from './../services/car.service';

@Controller('api/car')
export class CarController {
    constructor(
        private carService: CarService
    ){}

    @Get()
    getAll() {
        return this.carService.findAll();
    }

    @Post('/register')
    create(@Body() body: any) {
        return this.carService.register(body);
    }

}
