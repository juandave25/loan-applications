import { ApiProperty } from '@nestjs/swagger';

export class LoanApplicationStatusChangeDto {
  @ApiProperty()
  comments: string;
  @ApiProperty()
  applicationId: number;
  @ApiProperty()
  statusId: number;
}
