import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Speaker } from './speaker.entity';
import { VoiceArtistTask } from 'src/voice-artist-task/voice-artist-task.entity';
import { SpeakerResource } from 'src/speaker-resource/speaker-resource.entity';
import { SpeakerResourcesService } from 'src/speaker-resource/speaker-resources.service';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';

@Injectable()
export class SpeakersService extends TypeOrmCrudService<Speaker> {
  constructor(
    @InjectRepository(Speaker)
    private speakersRepository: Repository<Speaker>,
    private speakerResourcesService: SpeakerResourcesService,
    private s3ManagerService: S3ManagerService,
  ) {
    super(speakersRepository);
  }

  async generate(task: VoiceArtistTask) {
    const speaker = new Speaker();
    speaker.name = task.speaker_name;
    speaker.accent = task.accent;
    speaker.gender = task.gender;
    speaker.emotion = task.emotion;
    speaker.status = 'requested';
    speaker.user = task.user;
    await this.speakersRepository.save(speaker);

    for (let taskResource of task.resources) {
      const speakerResource = new SpeakerResource();
      speakerResource.transcription = taskResource.transcription;
      speakerResource.audio = taskResource.audio;
      speakerResource.status = 'unverified';
      speakerResource.accent = speaker.accent;
      speakerResource.emotion = speaker.emotion;
      speakerResource.gender = speaker.gender;
      speakerResource.speaker = speaker;
      await this.speakerResourcesService.create(speakerResource);
    }

    await this.s3ManagerService.copyObject(`dms/workdir/task/${task.id}`, `dms/workdir/speaker/${speaker.id}`);

    return speaker;
  }
}
