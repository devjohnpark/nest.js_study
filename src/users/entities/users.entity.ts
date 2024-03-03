import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn() // Primary Column
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}