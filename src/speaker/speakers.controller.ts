import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataLabellingTasksService } from 'src/data-labelling-task/data-labelling-tasks.service';
import { SpeakerResourcesService } from 'src/speaker-resource/speaker-resources.service';
import { VoiceArtistTasksService } from 'src/voice-artist-task/voice-artist-tasks.service';

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
  constructor(
    public service: SpeakersService,
    private voiceArtistTasksService: VoiceArtistTasksService,
    private dataLabellingTasksService: DataLabellingTasksService,
    private speakerResourcesService: SpeakerResourcesService,
  ) {}

  get base(): CrudController<Speaker> {
    return this;
  }

  // approve voice artist task
  @Get('/generate/:taskId')
  async generate(@Req() req) {
    const task = await this.voiceArtistTasksService.findOne(req.params.taskId, { relations: ['user', 'resources'] });
    return await this.service.generate(task);
  }

  // approve data abelling task
  @Get('/process/:taskId')
  async process(@Req() req) {
    const task = await this.dataLabellingTasksService.findOne(req.params.taskId, {
      relations: ['user', 'resources', 'speaker'],
    });
    return await this.service.process(task);
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const response: any = await this.base.getManyBase(req);
    if (response.data) {
      for (let speaker of response.data) {
        speaker.entries = await this.speakerResourcesService.getTotalEntries(speaker.id);
        speaker.verified = await this.speakerResourcesService.getVerifiedEntries(speaker.id);
      }
      return response;
    } else {
      return response;
    }
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest) {
    const response: any = await this.base.getOneBase(req);

    response.entries = await this.speakerResourcesService.getTotalEntries(response.id);
    response.verified = await this.speakerResourcesService.getVerifiedEntries(response.id);

    return response;
  }
}
