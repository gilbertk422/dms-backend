import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StartExportDto } from './dto/start-export.dto';
import { ExportProducerService } from './export.producer.service';
import { v4 as uuidv4 } from 'uuid';
import { SpeakerResourcesService } from 'src/speaker-resource/speaker-resources.service';
import config from 'src/config';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('export')
export default class ExportController {
  constructor(
    private exportProducerService: ExportProducerService,
    private speakerResourcesService: SpeakerResourcesService,
  ) {}

  @Post('/start')
  async start(@Body() dto: StartExportDto) {
    const exportKey = `${uuidv4()}.zip`;
    let resources = [];
    let prefix = `${config.prefix}/workdir/`;

    if (dto.type === 'speaker') {
      resources = await this.speakerResourcesService.find({ speaker: { id: dto.speaker.id } });
      prefix += `speaker/${dto.speaker.id}/`;
    }
    if (dto.type === 'speaker-resources') {
      resources = dto.speakerResources;
      prefix += `speaker/${dto.speakerResources[0].speaker.id}/`;
    }

    return await this.exportProducerService.startExport(
      exportKey,
      resources.map((r) => ({ audio: `${prefix}${r.audio}`, transcription: r.transcription })),
    );
  }

  @Get('/status/:jobId')
  @ApiParam({ name: 'jobId' })
  async status(@Req() req) {
    return await this.exportProducerService.getJobStatus(req.params.jobId);
  }
}
