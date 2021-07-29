import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakersService } from './speakers.service';
import { SpeakersController } from './speakers.controller';
import { Speaker } from './speaker.entity';
import { VoiceArtistTasksModule } from 'src/voice-artist-task/voice-artist-tasks.module';
import { SpeakerResourcesModule } from 'src/speaker-resource/speaker-resources.module';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { DataLabellingTasksModule } from 'src/data-labelling-task/data-labelling-tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Speaker]),
    VoiceArtistTasksModule,
    DataLabellingTasksModule,
    SpeakerResourcesModule,
  ],
  providers: [SpeakersService, S3ManagerService],
  exports: [SpeakersService],
  controllers: [SpeakersController],
})
export class SpeakersModule {}
