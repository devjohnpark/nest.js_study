import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
 

// 코드 가독성 증가
// Controller는 Routing 역할만하고, Business Logic은 Service에서 처리
// 여러 Business Logic(Service)을 조합하여, 요청에 대한 응답 처리 가능
// 다른 Business Logic(Service) Module 파일을 import하여, 같은 기능을 수행하도록 재활용 가능 (GET, POST...) 

@Controller('users') // 아래의 클 래스가 컨트롤러라고 annotation
export class UsersController {
  // userService: UsersService; // this.userService

  // Service 클래스에 대한 인스턴스를 생성 하지 않음(Service에 대한 Injection은 해준적이 없음)
  // 그런데 아래의 코드들에는 인스턴스를 참조한다. -> Nest.js IOC(Inversion Of Control) -> IOC Container에서 Service 인스턴스 자동 생성 (Service Injection)
  // IOC Container 내의 UserService 인스턴스가 포인팅을 Controller으로 하기 때문에 Provider라고 한다.
  constructor(private readonly usersService: UsersService) {  // userService: UsersService; // this.userService
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
