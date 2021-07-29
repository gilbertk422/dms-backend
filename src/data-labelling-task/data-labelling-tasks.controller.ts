import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { DataLabellingTask } from './data-labelling-task.entity';
import { DataLabellingTasksService } from './data-labelling-tasks.service';
import { DataLabellingTaskResourcesService } from 'src/data-labelling-task-resource/data-labelling-task-resources.service';
import constants from 'src/constants';

@Crud({
  dto: {
    create: CreateTaskDto,
  },
  model: {
    type: DataLabellingTask,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
      speaker: {
        eager: true,
      },
      managers: {
        eager: true,
      },
      resources: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('data-labelling-tasks')
export class DataLabellingTasksController implements CrudController<DataLabellingTask> {
  constructor(public service: DataLabellingTasksService, private resourcesService: DataLabellingTaskResourcesService) {}

  get base(): CrudController<DataLabellingTask> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const response: any = await this.base.getManyBase(req);
    if (response.data) {
      for (let task of response.data) {
        task.left = await this.resourcesService.getLeftEntries(task.id, constants.TARGET_STATUS[task.task_type]);
      }
      return response;
    } else {
      return response;
    }
  }
}
