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
    private resourcesRepository: Repository<SpeakerResource>,
    private s3ManagerService: S3ManagerService,
  ) {
    super(resourcesRepository);
  }

  async deleteAudio(req: CrudRequest) {
    const resource = await this.getOne(req);
    await this.s3ManagerService.deleteObject(
      `${config.prefix}/workdir/speaker/${resource.speaker.id}/${resource.audio}`,
    );
  }

  async save(resource: SpeakerResource) {
    return await this.resourcesRepository.save(resource);
  }

  async getTotalEntries(speakerId: number) {
    return this.resourcesRepository.count({ where: { speaker: { id: speakerId } } });
  }

  async getVerifiedEntries(speakerId: number) {
    return this.resourcesRepository.count({ where: { speaker: { id: speakerId }, verified: true } });
  }

  async getResources(speakerId: number, targetStatus, statusValue) {
    return this.resourcesRepository.find({
      where: { speaker: { id: speakerId }, [targetStatus]: statusValue, reported: false },
    });
  }
}
