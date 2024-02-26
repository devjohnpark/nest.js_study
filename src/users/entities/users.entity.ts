import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}