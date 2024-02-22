import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
 

// 코드 가독성 증가
// Controller는 Routing 역할만하고, Business Logic은 Service에서 처리
// 여러 Business Logic(Service)을 조합하여, 요청에 대한 응답 처리 가능
// 다른 Business Logic(Service) Module 파일을 import하여, 같은 기능을 수행하도록 재활용 가능 (GET, POST...) 

@Controller('users')
export class UsersController {
  // userService: UsersService; // this.userService

  constructor(public readonly usersService: UsersService) { 
    // this.userService = usersService; // private readonly
  }

  // GET /users
  @Get() 
  getUsers() {
    return this.usersService.getAllUsers();
  }

  // GET /users/:id
  @Get(':id') // :은 path parameter, id는 value of path parameter 
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  // POST /users /:
  @Post()
  postUser(
    @Body('name') name: string,
    @Body('age') age: number,
  ) {
    return this.usersService.createUser(name, age);
  }
  // PUT /users/:id
  @Put(':id')
  putUser(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('age') age?: number,
  ) {
    return this.usersService.updateUser(+id, name, age);
  }

  // Delete /user/:id
  @Delete(':id')
  deleteUser(
    @Param('id') id: String,
  ) {
      return this.usersService.deleteUser(+id);
  }
}
