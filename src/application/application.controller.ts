import { ApiResponse } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApplicationDto } from 'src/dto/application.dto';
import { LoanApplicationStatusChangeDto } from 'src/dto/applicationStatusChange.dto';
import { ResponseDto } from 'src/dto/response.dto';

@Controller({ version: '1' })
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('applications')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() application: ApplicationDto): Promise<ResponseDto> {
    const response = await this.applicationService.add(application);
    return response;
  }

  @Get('applications')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The records has been found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<ResponseDto> {
    const response = await this.applicationService.findAll();
    return response;
  }

  @Get('applications/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The record has been found.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<ResponseDto> {
    const response = await this.applicationService.findById(id);
    return response;
  }

  @Post('applications/status-change')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async UpdateApplicationStatus(
    @Body() application: LoanApplicationStatusChangeDto,
  ): Promise<ResponseDto> {
    const response =
      await this.applicationService.updateLoanApplication(application);
    return response;
  }
}
