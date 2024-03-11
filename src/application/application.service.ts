import { LoanApplicationStatusChangeDto } from './../dto/applicationStatusChange.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoanApplication } from '../database/models/application.entity';
import { LoanApplicationStatusChange } from './../database/models/loanApplicationStatusChange.entity';
import { ApplicationDto } from 'src/dto/application.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private loanApplicationDatabaseRepository: Repository<LoanApplication>,
    @InjectRepository(LoanApplicationStatusChange)
    private loanApplicationStatusChangeDatabaseRepository: Repository<LoanApplicationStatusChange>,
  ) {}

  async findAll(): Promise<ResponseDto> {
    const loanApplications = await this.loanApplicationDatabaseRepository.find({
      relations: { user: true, statusChanges: { status: true } },
      select: {
        id: true,
        amountRequested: true,
        submissionDate: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          email: true,
        },
        statusChanges: {
          id: true,
          status: { id: true, name: true },
          changeDate: true,
          comments: true,
        },
      },
    });
    return { success: true, data: loanApplications };
  }

  async findById(id: number): Promise<ResponseDto> {
    const loanApplication =
      await this.loanApplicationDatabaseRepository.findOne({
        where: { id: id },
        relations: { user: true, statusChanges: { status: true } },
        select: {
          id: true,
          amountRequested: true,
          submissionDate: true,
          user: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
            email: true,
          },
          statusChanges: {
            id: true,
            status: { id: true, name: true },
            changeDate: true,
            comments: true,
          },
        },
      });
    return { success: true, data: loanApplication };
  }

  async add(loanApplicationDto: ApplicationDto): Promise<ResponseDto> {
    const now = new Date();
    const application = this.loanApplicationDatabaseRepository.create({
      submissionDate: now,
      amountRequested: loanApplicationDto.amountRequested,
      user: { id: loanApplicationDto.userId },
    });
    const applicationCreated =
      await this.loanApplicationDatabaseRepository.save(application);
    const applicationStatusChange =
      this.loanApplicationStatusChangeDatabaseRepository.create({
        loanApplication: { id: applicationCreated.id },
        comments: '',
        status: { id: 1 },
        changeDate: now,
      });
    await this.loanApplicationStatusChangeDatabaseRepository.save(
      applicationStatusChange,
    );
    return { success: true };
  }

  async updateLoanApplication(
    loanApplicationStatusChangeDto: LoanApplicationStatusChangeDto,
  ): Promise<ResponseDto> {
    const now = new Date();
    const applicationStatusChange =
      this.loanApplicationStatusChangeDatabaseRepository.create({
        loanApplication: { id: loanApplicationStatusChangeDto.applicationId },
        comments: loanApplicationStatusChangeDto.comments,
        status: { id: loanApplicationStatusChangeDto.statusId },
        changeDate: now,
      });
    await this.loanApplicationStatusChangeDatabaseRepository.save(
      applicationStatusChange,
    );
    return { success: true };
  }
}
