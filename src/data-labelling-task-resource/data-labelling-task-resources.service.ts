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
}
