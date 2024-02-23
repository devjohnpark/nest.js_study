import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// 각 클래스를 Module에 지정하면, Dependency Injection이 필요할때 IOC Container에 자동으로 해당 클래스의 인스턴스 생성됨
@Module({ // 아래의 UsersModule 클래스가 Module이라고 지정
  controllers: [UsersController], // 인스턴스가 아니고 특정 클래스만 타입만 지정 -> 추후 Dependency Injection시, 자동 인스턴스 생성
  providers: [UsersService], // Dependency Injection이 필요한 Business Logic에 해당하는 Class들을 Provider로 지정 (@Injectable annotation으로 지정)
})
export class UsersModule {} 
