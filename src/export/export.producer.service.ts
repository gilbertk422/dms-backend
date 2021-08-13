import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';

interface IResource {
  audio: string;
  transcription: string;
}

export interface IJob {
  exportKey: string;
  resources: IResource[];
}

const getStatus = async (job: Job): Promise<string> => {
  if (await job.isCompleted()) return 'completed';
  if (await job.isFailed()) return 'failed';
  if (await job.isDelayed()) return 'delayed';
  if (await job.isPaused()) return 'paused';
  if (await job.isStuck()) return 'stuck';
  if (await job.isWaiting()) return 'waiting';
  if (await job.isActive()) return 'progress';
};

@Injectable()
export class ExportProducerService {
  constructor(@InjectQueue('export-queue') private queue: Queue) {}

  async startExport(exportKey: string, resources: IResource[]) {
    const job = await this.queue.add('export-job', {
      exportKey,
      resources,
    });
    const status = await getStatus(job);
    return {
      jobId: job.id,
      status,
      exportKey,
    };
  }

  async getJobStatus(jobId: string) {
    const job = await this.queue.getJob(jobId);
    const status = await getStatus(job);
    return {
      jobId: job.id,
      status,
      exportKey: job.data.exportKey,
    };
  }
}
