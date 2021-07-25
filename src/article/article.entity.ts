import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    no: number;
    
    @Column( "char", { length: 30, })
    title: string;

    @Column("text")
    content: string;
    
    @Column()
    tags: string;

    @Column("timestamp")
    uploaded: Date;

    @Column("timestamp")
    updated: Date;
}
