import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLabellingTasksService } from './data-labelling-tasks.service';
import { DataLabellingTasksController } from './data-labelling-tasks.controller';
import { DataLabellingTask } from './data-labelling-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataLabellingTask])],
  providers: [DataLabellingTasksService],
  exports: [DataLabellingTasksService],
  controllers: [DataLabellingTasksController],
})
export class DataLabellingTasksModule {}
