import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StateObservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}