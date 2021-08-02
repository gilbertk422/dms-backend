import { Controller, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { DataLabellingTaskResource } from './data-labelling-task-resource.entity';
import { DataLabellingTaskResourcesService } from './data-labelling-task-resources.service';

@Crud({
  model: {
    type: DataLabellingTaskResource,
  },
  query: {
    join: {
      task: {
        eager: true,
      },
      'task.speaker': {
        eager: true,
      },
      'task.managers': {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('data-labelling-task-resources')
export class DataLabellingTaskResourcesController implements CrudController<DataLabellingTaskResource> {
  constructor(public service: DataLabellingTaskResourcesService) {}

  get base(): CrudController<DataLabellingTaskResource> {
    return this;
  }
}
