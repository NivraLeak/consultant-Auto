import { Controller, Get, Post, Body, Req, UseGuards, Param, Put } from '@nestjs/common';
import { StateObservationService } from './../services/state-observation.service';
import { CreateStateObservationDto } from './../dto/state-observation.create.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './../../user/dto/user.dto';

@Controller('api/state-observation')
export class StateObservationController {
    constructor(
        private stateObservationService: StateObservationService
    ){}

    @Get()
    @UseGuards(AuthGuard()) 
    async getAll(@Req() req: any) {
        const user = <UserDto>req.user;

        return await this.stateObservationService.findAll(user);
    }

    @Post('/register')
    @UseGuards(AuthGuard()) 
    async create(@Body() createStateObservationDto: CreateStateObservationDto, @Req() req: any) {
        const user = <UserDto>req.user;

        return await this.stateObservationService.register(user, createStateObservationDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id') id: number, @Body() createStateObservationDto: CreateStateObservationDto, @Req() req: any){
        return await this.stateObservationService.update(id,createStateObservationDto);
    }

}
