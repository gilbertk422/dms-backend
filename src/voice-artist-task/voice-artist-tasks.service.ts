import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { VoiceArtistTask } from './voice-artist-task.entity';

@Injectable()
export class VoiceArtistTasksService extends TypeOrmCrudService<VoiceArtistTask> {
  constructor(
    @InjectRepository(VoiceArtistTask)
    private voiceartisttasksRepository: Repository<VoiceArtistTask>,
  ) {
    super(voiceartisttasksRepository);
  }
}
