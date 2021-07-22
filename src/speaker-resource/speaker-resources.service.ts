import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SpeakerResource } from './speaker-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { CrudRequest } from '@nestjsx/crud';
import config from 'src/config';

@Injectable()
export class SpeakerResourcesService extends TypeOrmCrudService<SpeakerResource> {
  constructor(
    @InjectRepository(SpeakerResource)
    private speakerResourcesRepository: Repository<SpeakerResource>,
    private s3ManagerService: S3ManagerService,
  ) {
    super(speakerResourcesRepository);
  }

  async deleteAudio(req: CrudRequest) {
    const resource = await this.getOne(req);
    await this.s3ManagerService.deleteObject(
      `${config.prefix}/workdir/speaker/${resource.speaker.id}/${resource.audio}`,
    );
  }

  async create(resource: SpeakerResource) {
    return await this.speakerResourcesRepository.save(resource);
  }

  async getTotalEntries(speakerId: number, status = '') {
    if (status) {
      return this.speakerResourcesRepository.count({ where: { speaker: { id: speakerId }, status } });
    } else {
      return this.speakerResourcesRepository.count({ where: { speaker: { id: speakerId } } });
    }
  }
}
