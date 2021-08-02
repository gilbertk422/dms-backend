import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DataLabellingTaskResource } from './data-labelling-task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { Not, In } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';
import config from 'src/config';

@Injectable()
export class DataLabellingTaskResourcesService extends TypeOrmCrudService<DataLabellingTaskResource> {
  constructor(
    @InjectRepository(DataLabellingTaskResource)
    private resourcesRepository: Repository<DataLabellingTaskResource>,
    private s3ManagerService: S3ManagerService,
  ) {
    super(resourcesRepository);
  }

  async create(resource: DataLabellingTaskResource) {
    return await this.resourcesRepository.save(resource);
  }

  async getLeftEntries(taskId: number, targetStatus = '') {
    return this.resourcesRepository.count({
      where: { task: { id: taskId }, [targetStatus]: false, reported: false },
    });
  }

  async getTotalEntries(taskId: number) {
    return this.resourcesRepository.count({ where: { task: { id: taskId } } });
  }

  async getEmotionTaggedEntries(taskId: number) {
    return this.resourcesRepository.count({ where: { task: { id: taskId }, emotion_tagged: true } });
  }

  async getTranscribedEntries(taskId: number) {
    return this.resourcesRepository.count({ where: { task: { id: taskId }, transcribed: true } });
  }

  async getVerifiedEntries(taskId: number) {
    return this.resourcesRepository.count({ where: { task: { id: taskId }, verified: true } });
  }

  async getReportedEntries(taskId: number) {
    return this.resourcesRepository.count({ where: { task: { id: taskId }, reported: true } });
  }
}
