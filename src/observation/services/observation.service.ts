import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from './../../user/dto/user.dto';
import { Observation } from './../entities/observation.entity';
import { UserService } from './../../user/services/user.service';
import { CarService } from './../../car/services/car.service';

import { States } from "./../../state-observation/entities/state-observation.entity";

import { ObservationDto } from './../dto/observation.dto';
import { toObservationDto } from './../../shared/mapper';
import { CreateObservationDto } from './../dto/observation.create.dto';

@Injectable()
export class ObservationService {
    constructor(
        @InjectRepository(Observation) private observationRepo: Repository<Observation>,
        private readonly userService: UserService,
        private readonly carService: CarService
    ) {}

    async findAll() {
        const observations = await this.observationRepo.find({ relations: ["car","userCreator","userResolve","stateObservation"] });
        let observationsResume = []
        observations.forEach(element => {
            let newObject = {
                id: element.id,
                detail: element.detail,
                car: element.car.vim,
                userCreator: element.userCreator.username,
                userResolve: element.userResolve.username,
                state: element.stateObservation.name
            };
            observationsResume.push(newObject)
        });

        return observationsResume;
    }

    async totalObservation() {
        const observations = await this.observationRepo.find({ relations: ["car","userCreator","userResolve","stateObservation"] });
        let requests = {
            registered: 0,
            accepted: 0,
            rejected: 0
        }
        observations.forEach(element => {
            switch (element.stateObservation.name) {
                case States.registered:
                    requests.registered++
                    break;
                case States.accepted:
                    requests.accepted++
                    break;
                case States.rejected:
                    requests.rejected++
                    break;
            }
        })
        return requests;
    }

    async createObservation({ username }: UserDto, createObservationDto: CreateObservationDto, ): Promise<any> {
        const { detail, car, stateObservation, userResolve } = createObservationDto;
        const userCreator = await this.userService.findOne({ where: { username } });

        const observation: Observation = await this.observationRepo.create({ detail, car, stateObservation, userCreator, userResolve });
        await this.observationRepo.save(observation);
        
        return toObservationDto(observation);  
    }    

    async addCarObservation(createObservationDto: CreateObservationDto, id: number, { username }: UserDto){
        const { detail, stateObservation, userResolve } = createObservationDto;
        const userCreator = await this.userService.findOne({ where: { username } });
        const car = await this.carService.findOne({where:{id}});
        const observation: Observation = await this.observationRepo.create({ detail, car, stateObservation, userCreator, userResolve });
        await this.observationRepo.save(observation);
        return toObservationDto(observation);
    }

    async update( id: number, createObservationDto: CreateObservationDto, { username }: UserDto){

        const { detail, car, stateObservation } = createObservationDto;
        const userResolve = await this.userService.findOne({ where: { username } });
        const observation = await this.observationRepo.findOne(id);
        this.observationRepo.merge(observation, { detail, car, stateObservation, userResolve });
        return this.observationRepo.save(observation);
    }

    async delete(id: number ) {
        const value = await this.observationRepo.delete(id);
        if(value.affected > 0){ 
            return true
        }
        return false;
    }    

}
