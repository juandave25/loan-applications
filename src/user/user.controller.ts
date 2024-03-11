import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../dto/Login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller({ version: '1' })
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('users/register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    const response = await this.usersService.create(registerDto);
    return response;
  }

  @Post('users/login')
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    const response = await this.usersService.findByEmailAndPassword(loginDto);
    return response;
  }
}
