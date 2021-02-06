import { Controller, Body, Get, Delete, Post, Put, Param, UseGuards, Req } from '@nestjs/common';
import { ObservationService } from './../services/observation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './../../user/dto/user.dto';
import { CreateObservationDto } from './../dto/observation.create.dto';

@Controller('api/observation')
export class ObservationController {
    constructor(
        private observationService: ObservationService
    ){}

    @Get()
    @UseGuards(AuthGuard())
    async getAll() {
        return await this.observationService.findAll();
    }

    @Get('/totalObservation')
    @UseGuards(AuthGuard())
    async getTotalObservation() {
        return await this.observationService.totalObservation();
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    async create(@Body() createObservationDto: CreateObservationDto, @Req() req: any) {
        const user = <UserDto>req.user;
        
        return await this.observationService.createObservation(user, createObservationDto);
    }

    @Post('/create/car/:id')
    @UseGuards(AuthGuard())
    async addCar(@Param('id') id: number, @Body() createObservationDto: CreateObservationDto, @Req() req: any) {
        const user = <UserDto>req.user;
        return await this.observationService.addCarObservation(createObservationDto, id, user);
    }


    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: number, @Body() createObservationDto: CreateObservationDto, @Req() req: any){
        const user = <UserDto>req.user;
        return await this.observationService.update(id, createObservationDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async delete(@Body() createObservationDto: CreateObservationDto, @Param('id') id:number){
        return await this.observationService.delete(id);
    }
}
