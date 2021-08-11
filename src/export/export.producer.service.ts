import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { DataLabellingTask } from 'src/data-labelling-task/data-labelling-task.entity';

@Injectable()
export class ExportProducerService {
  constructor(@InjectQueue('export-queue') private queue: Queue) {}

  async startExport(resources: DataLabellingTask[]) {
    return await this.queue.add('export-job', {
      resourceIds: resources.map((r) => r.id),
    });
  }

  async getJobStatus(jobId: string) {
    const job = await this.queue.getJob(jobId);
    return await job.isCompleted();
  }
}
