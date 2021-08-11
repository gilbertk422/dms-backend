import { Controller, Get, Req } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { GetJobStatusDto } from './dto/get-job-status.dto';
import { ExportProducerService } from './export.producer.service';

@Controller('export')
export default class ExportController {
  constructor(private exportProducerService: ExportProducerService) {}
  @Get('/start')
  async start() {
    return await this.exportProducerService.startExport([]);
  }

  @Get('/status/:jobId')
  @ApiParam({ name: 'jobId' })
  async status(@Req() req) {
    return this.exportProducerService.getJobStatus(req.params.jobId);
  }
}
