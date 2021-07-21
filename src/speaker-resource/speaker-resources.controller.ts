import { Controller, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { SpeakerResource } from './speaker-resource.entity';
import { SpeakerResourcesService } from './speaker-resources.service';

@Crud({
  model: {
    type: SpeakerResource,
  },
  query: {
    join: {
      speaker: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('speaker-resources')
export class SpeakerResourcesController implements CrudController<SpeakerResource> {
  constructor(public service: SpeakerResourcesService) {}

  get base(): CrudController<SpeakerResource> {
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
    type: SpeakerResource,
  },
  query: {
    join: {
      speaker: {
        eager: true,
      },
    },
  },
})
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('external/speaker-resources')
export class ExternalSpeakerResourcesController implements CrudController<SpeakerResource> {
  constructor(public service: SpeakerResourcesService) {}

  get base(): CrudController<SpeakerResource> {
    return this;
  }
}
