import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  speaker_name: string;

  @ApiProperty()
  @IsString()
  due_date: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  accent: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  emotion: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: User })
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  manager: User;
}
