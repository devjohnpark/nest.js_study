import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './users/entities/users.entity';

@Module({ 
  imports: [ // 생성한 Modules을 import (nest cli로 자동 생성 가능)
    UsersModule, 
    TypeOrmModule.forRoot({ // Nest.js와 TypeOrm 연동 (Nest.js의 최상위 모듈인 app.modules.ts와 TypeORM를 연동)
      // DB Type
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'qkrwnstj13@$',
      database: 'postgres',
      entities: [UsersModel], // DB Models
      synchronize: true, // nest.js에서 typeorm으로 생성한 데이터와 DB를 자동 동기화
    }),
  ], 
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {} // 생성한 Module들을 읽어들이는 Root Module
