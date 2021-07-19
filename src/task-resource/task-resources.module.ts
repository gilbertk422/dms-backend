import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResourcesService } from './task-resources.service';
import { ExternalTaskResourcesController, TaskResourcesController } from './task-resources.controller';
import { TaskResource } from './task-resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskResource])],
  providers: [TaskResourcesService],
  exports: [TaskResourcesService],
  controllers: [TaskResourcesController, ExternalTaskResourcesController],
})
export class TaskResourcesModule {}
