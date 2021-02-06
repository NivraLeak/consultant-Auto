import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CarService } from './../services/car.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './../../user/dto/user.dto';
import { CreateCarDto } from './../dto/car.create.dto';

@Controller('api/car')
export class CarController {
    constructor(
        private carService: CarService
    ){}

    @Get()
    getAll() {
        return this.carService.findAll();
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    async create(@Body() createCarDto: CreateCarDto, @Req() req: any) {
        const user = <UserDto>req.user;

        return await this.carService.createCar(user, createCarDto);
    }

}
