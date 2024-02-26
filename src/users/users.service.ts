import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';

// @GET과 같응ㄴ HTTP Method에 따른 annotation을 쓰지 않아, 기능에 구애받지 않고 함수 로직에만 초점을 두어 기능의 자유도를 부여

@Injectable() // Dependency Injection Annotation이며, Module에 Provider 지정이 필요
export class UsersService {
    constructor(
        @InjectRepository(UsersModel) // 특정 Model에 대한 Repository Provider를 Injection 필요
        private readonly usersRepository: Repository<UsersModel> // TypeORM에서 Repository 클래스 import, 특정 Model에 대한 Repo 지정
    ) {}

    async getAllUsers() { // TypeORM Quey Req는 Asynchronous가 기본
        return this.usersRepository.find(); // find 여러개 데이터 찾는 것 가능, 값 없을시 [] 빈 리스트 반환
    }

    async getUserById(id: number) {

        const user = await this.usersRepository.findOne({ // findOne은 비동기 함수이기 때문에, async 함수 반환시 await 해야됨 (Promise 타입의 함수 호출할때 await 안하면, null 값이 아니라 Promise { <pending> } 값 반환)
            where: {
                id:id, // id(key)와 id(value)가 동일한 경우 (value 생략 가능)
            }
        });

        if (!user) {
            throw new NotFoundException(); // 404 not found data
        }

        return user;
    }
    
    async createUser(name: string, age: number) {
        // 1) create -> 객체 생성 (TypeORM 호환 객체로 생성)
        // 2) save -> DB에 객체 저장
        const user = this.usersRepository.create({ // DB에 생성하는 것이 아니라 객체 생성이라 Synchronous로 생성, create 타입 체크 자동
            name, // name: name와 같음
            age,
        });

        const newUser = await this.usersRepository.save(user);

        return newUser;
    }

    async updateUser(id: number, name: string, age: number) {
        // save 기능
        // 1) 만약 기존의 데이터가 없다면, id 기준으로 새로 생성
        // 2) 만약 데이터가 존재한다면 (같은 id의 값이 존재한다면), 존재하던 값을 업데이트
        const user = await this.usersRepository.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException();
        }

        if (name) {
            user.name = name;
        }

        if (age) {
            user.age = age;
        }

        const newUser = await this.usersRepository.save(user); // findOne에서 DB 가져오므로 id 존재
 

        return newUser;
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id,
            }
        });

        if(!user) {
            throw new NotFoundException();
        }

        await this.usersRepository.delete(id);

        return id;
    }
}


export interface UserModel {
    id: number;
    name: string;
    age: number;
}
  
let users: UserModel[] = [
    {
        id: 1,
        name: 'John',
        age: 20,
    },
        {
        id: 2,
        name: 'Amily',
        age: 21,
    },
    {
        id: 3,
        name: 'Micky',
        age: 22,
    },
];

