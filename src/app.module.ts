import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationService } from './application/application.service';
import { ApplicationController } from './application/application.controller';
import { ApplicationModule } from './application/application.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/user.entity';
import { LoanApplication } from './database/models/application.entity';
import { LoanApplicationStatusChange } from './database/models/loanApplicationStatusChange.entity';
import { LoanStatus } from './database/models/status.entity';

@Module({
  imports: [
    ApplicationModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'loan_application',
      entities: [
        User,
        LoanApplication,
        LoanApplicationStatusChange,
        LoanStatus,
      ],
      synchronize: false,
      migrationsTableName: 'migrations',
      migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
    }),
  ],
  controllers: [AppController, ApplicationController, UserController],
  providers: [AppService, ApplicationService, UserService],
})
export class AppModule {}
