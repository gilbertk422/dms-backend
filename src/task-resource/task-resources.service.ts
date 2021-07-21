import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TaskResource } from './task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { CrudRequest } from '@nestjsx/crud';
import config from 'src/config';

@Injectable()
export class TaskResourcesService extends TypeOrmCrudService<TaskResource> {
  constructor(
    @InjectRepository(TaskResource)
    private taskResourcesRepository: Repository<TaskResource>,
    private s3ManagerService: S3ManagerService,
  ) {
    super(taskResourcesRepository);
  }

  async deleteAudio(req: CrudRequest) {
    const resource = await this.getOne(req);
    await this.s3ManagerService.deleteObject(`${config.prefix}/workdir/task/${resource.task.id}/${resource.audio}`);
  }
}
