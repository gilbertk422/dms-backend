import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLabellingTasksService } from './data-labelling-tasks.service';
import { DataLabellingTasksController } from './data-labelling-tasks.controller';
import { DataLabellingTask } from './data-labelling-task.entity';
import { DataLabellingTaskResourcesModule } from 'src/data-labelling-task-resource/data-labelling-task-resources.module';
import { SpeakerResourcesModule } from 'src/speaker-resource/speaker-resources.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataLabellingTask]), DataLabellingTaskResourcesModule, SpeakerResourcesModule],
  providers: [DataLabellingTasksService],
  exports: [DataLabellingTasksService],
  controllers: [DataLabellingTasksController],
})
export class DataLabellingTasksModule {}
