import { MiddlewareConsumer, Module } from '@nestjs/common';
import ExportController from './export.controller';
import ExportService from './export.service';
import { ExportProducerService } from './export.producer.service';
import { BullModule } from '@nestjs/bull';
import { QueueUIProvider } from './queueui.provider';
import { UI } from 'bull-board';
import { ExportConsumer } from './export.consumer';
import { SpeakerResourcesModule } from 'src/speaker-resource/speaker-resources.module';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'export-queue',
    }),
    SpeakerResourcesModule,
  ],
  providers: [ExportService, ExportProducerService, ExportConsumer, QueueUIProvider, S3ManagerService],
  exports: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UI).forRoutes('/export/queue');
  }
}
