import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceArtistTasksService } from './voice-artist-tasks.service';
import { VoiceArtistTasksController } from './voice-artist-tasks.controller';
import { VoiceArtistTask } from './voice-artist-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceArtistTask])],
  providers: [VoiceArtistTasksService],
  exports: [VoiceArtistTasksService],
  controllers: [VoiceArtistTasksController],
})
export class VoiceArtistTasksModule {}
