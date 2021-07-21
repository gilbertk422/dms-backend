import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerResourcesService } from './speaker-resources.service';
import { ExternalSpeakerResourcesController, SpeakerResourcesController } from './speaker-resources.controller';
import { SpeakerResource } from './speaker-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpeakerResource])],
  providers: [SpeakerResourcesService, S3ManagerService],
  exports: [SpeakerResourcesService],
  controllers: [SpeakerResourcesController, ExternalSpeakerResourcesController],
})
export class SpeakerResourcesModule {}
