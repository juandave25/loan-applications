import { User } from './../database/models/user.entity';
import { LoginDto } from './../dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userDatabaseRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(registerDto: RegisterDto): Promise<ResponseDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = this.userDatabaseRepository.create({
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: registerDto.role,
      password: hashedPassword,
    });
    const savedUser = await this.userDatabaseRepository.save(user);
    return {
      success: true,
      data: {
        id: savedUser.id,
        email: savedUser.email,
        first_name: savedUser.firstName,
        last_name: savedUser.lastName,
        role: savedUser.role,
      },
    };
  }

  async findByEmailAndPassword(loginDto: LoginDto): Promise<ResponseDto> {
    const user = await this.userDatabaseRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
    const payload = {
      sub: user.id,
      username: user.email,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`,
    };
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role,
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
        }),
      },
    };
  }
}
