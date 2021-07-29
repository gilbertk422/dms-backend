import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { VoiceArtistTaskResource } from './voice-artist-task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { CrudRequest } from '@nestjsx/crud';
import config from 'src/config';

@Injectable()
export class VoiceArtistTaskResourcesService extends TypeOrmCrudService<VoiceArtistTaskResource> {
  constructor(
    @InjectRepository(VoiceArtistTaskResource)
    private resourcesRepository: Repository<VoiceArtistTaskResource>,
    private s3ManagerService: S3ManagerService,
  ) {
    super(resourcesRepository);
  }

  async deleteAudio(req: CrudRequest) {
    const resource = await this.getOne(req);
    await this.s3ManagerService.deleteObject(`${config.prefix}/workdir/task/${resource.task.id}/${resource.audio}`);
  }
}
