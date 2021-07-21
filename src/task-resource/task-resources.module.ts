import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResourcesService } from './task-resources.service';
import { ExternalTaskResourcesController, TaskResourcesController } from './task-resources.controller';
import { TaskResource } from './task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { VoiceArtistTasksService } from 'src/voice-artist-task/voice-artist-tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskResource])],
  providers: [TaskResourcesService, S3ManagerService],
  exports: [TaskResourcesService],
  controllers: [TaskResourcesController, ExternalTaskResourcesController],
})
export class TaskResourcesModule {}
