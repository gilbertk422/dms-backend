import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { IUserRequest } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { VoiceArtistTask } from './voice-artist-task.entity';
import { VoiceArtistTasksService } from './voice-artist-tasks.service';

@Crud({
  dto: {
    create: CreateTaskDto,
  },
  model: {
    type: VoiceArtistTask,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
      manager: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('voice-artist-tasks')
export class VoiceArtistTasksController implements CrudController<VoiceArtistTask> {
  constructor(public service: VoiceArtistTasksService) {}
}
