import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StateObservation } from './../entities/state-observation.entity';


@Injectable()
export class StateObservationService {
    constructor(
        @InjectRepository(StateObservation) private stateObservationRepo: Repository<StateObservation>
    ) {}

    findAll() {
        return this.stateObservationRepo.find();
    }

    register(body: any) {
        const newState = this.stateObservationRepo.create(body);
        return this.stateObservationRepo.save(newState);
    }
}
