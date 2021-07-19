import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DataLabellingTask } from './data-labelling-task.entity';

@Injectable()
export class DataLabellingTasksService extends TypeOrmCrudService<DataLabellingTask> {
  constructor(
    @InjectRepository(DataLabellingTask)
    private datalabellingtasksRepository: Repository<DataLabellingTask>,
  ) {
    super(datalabellingtasksRepository);
  }
}
