import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({ 
  imports: [UsersModule], // 생성한 Modules을 import (nest cli로 자동 생성 가능)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} // 생성한 Module들을 읽어들이는 Root Module
