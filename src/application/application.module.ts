import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanApplication } from 'src/database/models/application.entity';
import { LoanApplicationStatusChange } from 'src/database/models/loanApplicationStatusChange.entity';
import { LoanStatus } from 'src/database/models/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanApplication,
      LoanApplicationStatusChange,
      LoanStatus,
    ]),
  ],
  providers: [ApplicationService],
  exports: [TypeOrmModule],
})
export class ApplicationModule {}
