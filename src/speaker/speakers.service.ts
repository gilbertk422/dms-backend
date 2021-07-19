import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Speaker } from './speaker.entity';

@Injectable()
export class SpeakersService extends TypeOrmCrudService<Speaker> {
  constructor(
    @InjectRepository(Speaker)
    private speakersRepository: Repository<Speaker>,
  ) {
    super(speakersRepository);
  }
}
