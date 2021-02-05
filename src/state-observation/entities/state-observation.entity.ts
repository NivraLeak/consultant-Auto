import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Observation } from "./../../observation/entities/observation.entity";

export const States = {
    registered: 'registered',
    accepted: 'accepted',
    rejected: 'rejected'
}
@Entity()
export class StateObservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: States.registered, length: 45})
    name: string;

    @OneToMany(() => Observation, observation => observation.stateObservation)
    observations: Observation[];
}