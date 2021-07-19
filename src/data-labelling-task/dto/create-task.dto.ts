import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Speaker } from 'src/speaker/speaker.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  speaker: Speaker;

  @ApiProperty()
  @IsString()
  task_type: string;

  @ApiProperty()
  @IsString()
  assign_type: string;

  @ApiProperty()
  @IsString()
  due_date: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  users: User[];
}
