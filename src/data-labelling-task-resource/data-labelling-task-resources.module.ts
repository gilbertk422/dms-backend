import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLabellingTaskResourcesService } from './data-labelling-task-resources.service';
import { DataLabellingTaskResourcesController } from './data-labelling-task-resources.controller';
import { DataLabellingTaskResource } from './data-labelling-task-resource.entity';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataLabellingTaskResource])],
  providers: [DataLabellingTaskResourcesService, S3ManagerService],
  exports: [DataLabellingTaskResourcesService],
  controllers: [DataLabellingTaskResourcesController],
})
export class DataLabellingTaskResourcesModule {}
