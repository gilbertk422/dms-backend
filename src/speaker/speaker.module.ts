import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakersService } from './speaker.service';
import { SpeakersController } from './speaker.controller';
import { Speaker } from './speaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  providers: [SpeakersService],
  exports: [SpeakersService],
  controllers: [SpeakersController],
})
export class SpeakersModule {}
