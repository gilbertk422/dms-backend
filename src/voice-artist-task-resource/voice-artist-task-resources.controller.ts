import { Controller, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { VoiceArtistTaskResource } from './voice-artist-task-resource.entity';
import { VoiceArtistTaskResourcesService } from './voice-artist-task-resources.service';

@Crud({
  model: {
    type: VoiceArtistTaskResource,
  },
  query: {
    join: {
      task: {
        eager: true,
      },
      'task.manager': {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('voice-artist-task-resources')
export class VoiceArtistTaskResourcesController implements CrudController<VoiceArtistTaskResource> {
  constructor(public service: VoiceArtistTaskResourcesService) {}

  get base(): CrudController<VoiceArtistTaskResource> {
    return this;
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    await this.service.deleteAudio(req);
    return this.base.deleteOneBase(req);
  }
}

@Crud({
  model: {
    type: VoiceArtistTaskResource,
  },
  query: {
    join: {
      task: {
        eager: true,
      },
    },
  },
})
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('external/voice-artist-task-resources')
export class ExternalVoiceArtistTaskResourcesController implements CrudController<VoiceArtistTaskResource> {
  constructor(public service: VoiceArtistTaskResourcesService) {}

  get base(): CrudController<VoiceArtistTaskResource> {
    return this;
  }
}
