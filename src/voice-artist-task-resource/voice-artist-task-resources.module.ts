import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceArtistTaskResourcesService } from './voice-artist-task-resources.service';
import {
  ExternalVoiceArtistTaskResourcesController,
  VoiceArtistTaskResourcesController,
} from './voice-artist-task-resources.controller';
import { VoiceArtistTaskResource } from './voice-artist-task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceArtistTaskResource])],
  providers: [VoiceArtistTaskResourcesService, S3ManagerService],
  exports: [VoiceArtistTaskResourcesService],
  controllers: [VoiceArtistTaskResourcesController, ExternalVoiceArtistTaskResourcesController],
})
export class VoiceArtistTaskResourcesModule {}
