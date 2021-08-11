import { MiddlewareConsumer, Module } from '@nestjs/common';
import ExportController from './export.controller';
import ExportService from './export.service';
import { ExportProducerService } from './export.producer.service';
import { BullModule } from '@nestjs/bull';
import { QueueUIProvider } from './queueui.provider';
import { UI } from 'bull-board';
import { ExportConsumer } from './export.consumer';

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
  ],
  providers: [ExportService, ExportProducerService, ExportConsumer, QueueUIProvider],
  exports: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UI).forRoutes('/export/queue');
  }
}
