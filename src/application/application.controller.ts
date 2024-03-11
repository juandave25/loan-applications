import { ApplicationService } from './application.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationDto } from 'src/dto/application.dto';
import { LoanApplicationStatusChangeDto } from 'src/dto/applicationStatusChange.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Controller({ version: '1' })
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('applications')
  async create(@Body() application: ApplicationDto): Promise<ResponseDto> {
    const response = await this.applicationService.add(application);
    return response;
  }

  @Get('applications')
  async findAll(): Promise<ResponseDto> {
    const response = await this.applicationService.findAll();
    return response;
  }

  @Get('applications/:id')
  async findOne(@Param('id') id: number): Promise<ResponseDto> {
    const response = await this.applicationService.findById(id);
    return response;
  }

  @Post('applications/status-change')
  async UpdateApplicationStatus(
    @Body() application: LoanApplicationStatusChangeDto,
  ): Promise<ResponseDto> {
    const response =
      await this.applicationService.updateLoanApplication(application);
    return response;
  }
}
