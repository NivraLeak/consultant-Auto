import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Observation } from './../entities/observation.entity';
import { States } from "./../../state-observation/entities/state-observation.entity";

@Injectable()
export class ObservationService {
    constructor(
        @InjectRepository(Observation) private observationRepo: Repository<Observation>
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

    register(body: any) {
        const newObservation = this.observationRepo.create(body);
        return this.observationRepo.save(newObservation);
    }

    addCarObservation(body: any, idCar: number){
        const newObject = {
            ...body,
            id: idCar
        }
        newObject.id = parseInt(newObject.id)
        const newObservation = this.observationRepo.create(newObject);
        return this.observationRepo.save(newObservation);
    }

    async update( id: number, body:any ){
        const observation = await this.observationRepo.findOne(id);
        this.observationRepo.merge(observation, body);
        return this.observationRepo.save(observation);
    }

    async delete( id: number ) {
        await this.observationRepo.delete(id);
        return true;
    }    

}
