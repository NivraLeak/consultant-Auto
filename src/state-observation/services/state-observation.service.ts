import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StateObservation } from './../entities/state-observation.entity';
import { CreateStateObservationDto } from './../dto/state-observation.create.dto';
import { StateObservationDto } from './../dto/state-observation.dto';
import { UserService } from './../../user/services/user.service'
import { toStateObservationDto } from './../../shared/mapper';
import { UserDto } from './../../user/dto/user.dto';

@Injectable()
export class StateObservationService {
    constructor(
        @InjectRepository(StateObservation) private stateObservationRepo: Repository<StateObservation>,
        private readonly userService: UserService,
    ) {}

    async findAll({ username }: UserDto) {
        const owner = await this.userService.findOne({ where: { username } });
        const stateObservations: StateObservation[] = await this.stateObservationRepo.find();

        return stateObservations;
    }

    async register({ username }: UserDto, createStateObservationDto: CreateStateObservationDto ): Promise<StateObservationDto> {
        const { name } = createStateObservationDto;
          
        const owner = await this.userService.findOne({ where: { username } });
        const stateObservation: StateObservation = await this.stateObservationRepo.create({ name });
        await this.stateObservationRepo.save(stateObservation);
        return toStateObservationDto(stateObservation);  
    }

    async update( id: number, createStateObservationDto: CreateStateObservationDto ){
        const observationState = await this.stateObservationRepo.findOne(id);
        this.stateObservationRepo.merge(observationState, createStateObservationDto);
        return this.stateObservationRepo.save(observationState);
    }
}
