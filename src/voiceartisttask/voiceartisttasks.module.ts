import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceArtistTasksService } from './voiceartisttasks.service';
import { VoiceArtistTasksController } from './voiceartisttasks.controller';
import { VoiceArtistTask } from './voiceartisttask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceArtistTask])],
  providers: [VoiceArtistTasksService],
  exports: [VoiceArtistTasksService],
  controllers: [VoiceArtistTasksController],
})
export class VoiceArtistTasksModule {}
