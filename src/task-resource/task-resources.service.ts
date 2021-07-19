import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TaskResource } from './task-resource.entity';

@Injectable()
export class TaskResourcesService extends TypeOrmCrudService<TaskResource> {
  constructor(
    @InjectRepository(TaskResource)
    private taskResourcesRepository: Repository<TaskResource>,
  ) {
    super(taskResourcesRepository);
  }
}
