import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, ManyToOne } from 'typeorm';
import { Observation } from "./../../observation/entities/observation.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true
    }) 
    username: string;
    
    @Column({ 
        type: 'varchar', 
        nullable: false
    }) 
    password: string;  
    
    @Column({ 
        type: 'varchar', 
        nullable: false
    })
    email: string;
    
    @ManyToOne(type => User)owner?: User;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @OneToMany(() => Observation, observation => observation.userCreator)
    observationsCreator: Observation[];

    @OneToMany(() => Observation, observation => observation.userResolve)
    observationsResolve: Observation[];
}