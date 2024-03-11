import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../dto/Login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Controller({ version: '1' })
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('users/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    const response = await this.usersService.create(registerDto);
    return response;
  }

  @Post('users/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    const response = await this.usersService.findByEmailAndPassword(loginDto);
    return response;
  }
}
