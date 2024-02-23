import { Injectable, NotFoundException } from '@nestjs/common';

// annotation(@)을 쓰지 않아서, HTTP Method에 따른 기능에 구애받지 않고 함수 로직에만 초점을 두어 기능의 자유도를 부여

@Injectable() // Dependency Injection Annotation이며, Module에 Provider 지정이 필요
export class UsersService {
    getAllUsers() {
        return users;
    }

    getUserById(id: number) {
        const user = users.find((user) => user.id === +id); 

        if (!user) {
            throw new NotFoundException(); // 404 not found data
        }

        return user;
    }
    
    createUser(name: string, age: number) {
        const user: UserModel = {
            id: users[users.length - 1].id + 1,
            name,
            age,
        }
        users.push(user);

        return user;
    }

    updateUser(id: number, name: string, age: number) {
        const user = users.find(user => user.id === +id);

        if (!user) {
            throw new NotFoundException();
        }

        if (name) {
            user.name = name;
        }

        if (age) {
            user.age = age;
        }

        users = users.map(findedUser => findedUser.id === id ? user : findedUser);  

        return user;
    }

    deleteUser(id: number) {
        const user = users.find(user => user.id === id);

        if(!user) {
            throw new NotFoundException();
        }

        users = users.filter(user => user.id !== id);

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

