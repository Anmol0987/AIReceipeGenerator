import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    /*
        inject user service
        */
    private readonly userService: UsersService,
  ) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/find')
  public findByEmail(@Body('email') email: string) {
    console.log
    return this.userService.findByEmail(email);
  }
}
