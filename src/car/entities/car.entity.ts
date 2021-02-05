import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Observation } from "./../../observation/entities/observation.entity";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45})
    vim: string;

    @OneToMany(() => Observation, observation => observation.car)
    observations: Observation[];
}