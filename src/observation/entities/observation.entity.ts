import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from "./../../car/entities/car.entity";
import { StateObservation } from "./../../state-observation/entities/state-observation.entity";
import { User } from "./../../user/entities/user.entity";

@Entity()
export class Observation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable:false})
    detail: string;

    @ManyToOne(() => StateObservation, stateObservation => stateObservation.observations, {nullable:false})
    stateObservation: StateObservation;

    @ManyToOne(() => Car, car => car.observations,{nullable:false})
    car: Car;

    @ManyToOne(() => User, user => user.observationsCreator, {nullable:false})
    userCreator: User;

    @ManyToOne(() => User, user => user.observationsResolve, )
    userResolve: User;

}