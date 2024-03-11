import { Module } from '@nestjs/common';
//import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
//import { userProviders } from 'src/repositories/user.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
