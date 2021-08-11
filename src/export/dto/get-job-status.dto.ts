import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetJobStatusDto {
  @ApiProperty()
  @IsString()
  jobId: string;
}
