import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    firstName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: number;
}