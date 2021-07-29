import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DataLabellingTask } from './data-labelling-task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DataLabellingTaskResource } from 'src/data-labelling-task-resource/data-labelling-task-resource.entity';
import { DataLabellingTaskResourcesService } from 'src/data-labelling-task-resource/data-labelling-task-resources.service';
import { SpeakerResourcesService } from 'src/speaker-resource/speaker-resources.service';
import constants from 'src/constants';

@Injectable()
export class DataLabellingTasksService extends TypeOrmCrudService<DataLabellingTask> {
  constructor(
    @InjectRepository(DataLabellingTask)
    private datalabellingtasksRepository: Repository<DataLabellingTask>,
    private resourcesService: DataLabellingTaskResourcesService,
    private speakerResourcesService: SpeakerResourcesService,
  ) {
    super(datalabellingtasksRepository);
  }

  async complete(task: DataLabellingTask) {}

  async create(dto: CreateTaskDto) {
    const task = new DataLabellingTask();
    task.name = dto.name;
    task.task_type = dto.task_type;
    task.assign_type = dto.assign_type;
    task.status = dto.status;
    task.description = dto.description;
    task.due_date = new Date(dto.due_date);
    task.speaker = dto.speaker;
    task.user = dto.user;
    task.managers = dto.managers;
    await this.datalabellingtasksRepository.save(task);

    if (dto.assign_type === 'resource') {
      for (let speakerResource of dto.resources) {
        const taskResource = new DataLabellingTaskResource();
        taskResource.transcription = speakerResource.transcription;
        taskResource.audio = speakerResource.audio;
        taskResource.accent = speakerResource.accent;
        taskResource.gender = speakerResource.gender;
        taskResource.notes = speakerResource.notes;
        taskResource.emotion = speakerResource.emotion;
        taskResource.transcribed = speakerResource.transcribed;
        taskResource.verified = speakerResource.verified;
        taskResource.reported = speakerResource.reported;
        taskResource.emotion_tagged = speakerResource.emotion_tagged;
        taskResource.speaker_resource_id = speakerResource.id;
        taskResource.task = task;
        await this.resourcesService.create(taskResource);
      }
    } else {
      const allResources = await this.speakerResourcesService.getResources(
        task.speaker.id,
        constants.TARGET_STATUS[task.task_type],
        false,
      );
      for (let speakerResource of allResources) {
        const taskResource = new DataLabellingTaskResource();
        taskResource.transcription = speakerResource.transcription;
        taskResource.audio = speakerResource.audio;
        taskResource.accent = speakerResource.accent;
        taskResource.gender = speakerResource.gender;
        taskResource.notes = speakerResource.notes;
        taskResource.emotion = speakerResource.emotion;
        taskResource.transcribed = speakerResource.transcribed;
        taskResource.verified = speakerResource.verified;
        taskResource.reported = speakerResource.reported;
        taskResource.emotion_tagged = speakerResource.emotion_tagged;
        taskResource.speaker_resource_id = speakerResource.id;
        taskResource.task = task;
        await this.resourcesService.create(taskResource);
      }
    }

    return task;
  }
}
