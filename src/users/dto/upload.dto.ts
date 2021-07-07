import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty()
  @IsNotEmpty()
  filename: string;
}
