import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    no: number;
    
    @Column( "char", { length: 30, })
    id: string;

    @Column()
    password: string;

    @Column("char", {length: 15})
    role: string;
}
