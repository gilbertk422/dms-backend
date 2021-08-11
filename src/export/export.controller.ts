import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExportProducerService } from './export.producer.service';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
