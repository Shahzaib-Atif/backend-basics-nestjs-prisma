import { Body, Controller, Get, Post } from '@nestjs/common';
import { FetchUserDto, FetchUserI } from 'src/app/dtos/user/FetchUserDto';
import { LoginUserDto, LoginUserI } from 'src/app/dtos/user/LoginUserDto';
import {
  RegisterUserdDto,
  RegisterUserI,
} from 'src/app/dtos/user/RegisterUserDto';
import { UserService } from '../../app/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserI): Promise<any> {
    const registerUserDto = RegisterUserdDto.create(body);
    return this.userService.registerUser(registerUserDto);
  }

  @Post('/login')
  async login(@Body() body: LoginUserI): Promise<any> {
    const loginUserDto = LoginUserDto.create(body);
    return this.userService.loginUser(loginUserDto);
  }

  @Get('/getUser')
  async getUser(@Body() body: FetchUserI): Promise<any> {
    const fetchUserDto = FetchUserDto.create(body);
    return this.userService.fetchUser(fetchUserDto);
  }
}
