import { Controller, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { TaskResource } from './task-resource.entity';
import { TaskResourcesService } from './task-resources.service';

@Crud({
  model: {
    type: TaskResource,
  },
  query: {
    join: {
      task: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('task-resources')
export class TaskResourcesController implements CrudController<TaskResource> {
  constructor(public service: TaskResourcesService) {}

  get base(): CrudController<TaskResource> {
    return this;
  }
}

@Crud({
  model: {
    type: TaskResource,
  },
  query: {
    join: {
      task: {
        eager: true,
      },
    },
  },
})
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('external/task-resources')
export class ExternalTaskResourcesController implements CrudController<TaskResource> {
  constructor(public service: TaskResourcesService) {}

  get base(): CrudController<TaskResource> {
    return this;
  }
}
