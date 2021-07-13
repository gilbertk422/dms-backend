import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLabellingTasksService } from './datalabellingtask.service';
import { DataLabellingTasksController } from './datalabellingtask.controller';
import { DataLabellingTask } from './datalabellingtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataLabellingTask])],
  providers: [DataLabellingTasksService],
  exports: [DataLabellingTasksService],
  controllers: [DataLabellingTasksController],
})
export class DataLabellingTasksModule {}
