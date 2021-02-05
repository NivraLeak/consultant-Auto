import { Controller, Body, Get, Delete, Post, Put, Param } from '@nestjs/common';
import { ObservationService } from './../services/observation.service';

@Controller('api/observation')
export class ObservationController {
    constructor(
        private observationService: ObservationService
    ){}

    @Get()
    async getAll() {
        return await this.observationService.findAll();
    }

    @Get('/totalObservation')
    async getTotalObservation() {
        return await this.observationService.totalObservation();
    }

    @Post('/register')
    create(@Body() body: any) {
        return this.observationService.register(body);
    }

    @Post('/register/car/:id')
    addCar(@Param('id') id: number, @Body() body: any) {
        return this.observationService.addCarObservation(body, id);
    }


    @Put(':id')
    update(@Param('id') id: number, @Body() body: any){
        return this.observationService.update(id,body);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.observationService.delete(id);
    }
}
