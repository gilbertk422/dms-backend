import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Speaker } from './speaker.entity';
import { SpeakersService } from './speakers.service';

@Crud({
  model: {
    type: Speaker,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('speakers')
export class SpeakersController implements CrudController<Speaker> {
  constructor(public service: SpeakersService) {}
}
