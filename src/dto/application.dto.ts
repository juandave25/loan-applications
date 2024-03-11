import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
  @ApiProperty()
  amountRequested: number;
  @ApiProperty()
  userId: number;
}
