import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  data?: any;
  @ApiProperty()
  message?: string;
}
