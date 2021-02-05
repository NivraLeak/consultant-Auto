import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from "./../../car/entities/car.entity";
import { StateObservation } from "./../../state-observation/entities/state-observation.entity";
import { User } from "./../../user/entities/user.entity";

@Entity()
export class Observation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    detail: string;

    @ManyToOne(() => StateObservation, stateObservation => stateObservation.observations)
    stateObservation: StateObservation;

    @ManyToOne(() => Car, car => car.observations)
    car: Car;

    @ManyToOne(() => User, user => user.observationsCreator)
    userCreator: User;

    @ManyToOne(() => User, user => user.observationsResolve)
    userResolve: User;

}