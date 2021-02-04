import { Controller, Get, Post, Body } from '@nestjs/common';
import { StateObservationService } from './../services/state-observation.service';

@Controller('api/state-observation')
export class StateObservationController {
    constructor(
        private stateObservationService: StateObservationService
    ){}

    @Get()
    getAll() {
        return this.stateObservationService.findAll();
    }

    @Post('/register')
    create(@Body() body: any) {
        return this.stateObservationService.register(body);
    }

}
