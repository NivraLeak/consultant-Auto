import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Observation } from "./../../observation/entities/observation.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45})
    username: string;

    @Column({length: 45})
    password: string;

    @OneToMany(() => Observation, observation => observation.userCreator)
    observationsCreator: Observation[];

    @OneToMany(() => Observation, observation => observation.userResolve)
    observationsResolve: Observation[];
}