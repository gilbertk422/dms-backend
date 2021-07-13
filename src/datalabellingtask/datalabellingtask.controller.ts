import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { DataLabellingTask } from './datalabellingtask.entity';
import { DataLabellingTasksService } from './datalabellingtask.service';

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
      users: {
        eager: true,
      },
    },
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('datalabellingtasks')
export class DataLabellingTasksController implements CrudController<DataLabellingTask> {
  constructor(public service: DataLabellingTasksService) {}
}
