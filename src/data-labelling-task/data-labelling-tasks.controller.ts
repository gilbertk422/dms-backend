import { Controller, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { DataLabellingTask } from './data-labelling-task.entity';
import { DataLabellingTasksService } from './data-labelling-tasks.service';
import { DataLabellingTaskResourcesService } from 'src/data-labelling-task-resource/data-labelling-task-resources.service';
import constants from 'src/constants';
import { IUserRequest } from 'src/users/user.entity';

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
  async getMany(@ParsedRequest() req: CrudRequest, @Req() request: IUserRequest) {
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

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest) {
    const response: any = await this.base.getOneBase(req);

    response.left = await this.resourcesService.getLeftEntries(
      response.id,
      constants.TARGET_STATUS[response.task_type],
    );
    response.entries = await this.resourcesService.getTotalEntries(response.id);
    response.emotion_tagged = await this.resourcesService.getEmotionTaggedEntries(response.id);
    response.transcribed = await this.resourcesService.getTranscribedEntries(response.id);
    response.verified = await this.resourcesService.getVerifiedEntries(response.id);
    response.reported = await this.resourcesService.getReportedEntries(response.id);

    return response;
  }
}
