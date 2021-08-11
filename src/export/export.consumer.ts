import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('export-queue')
export class ExportConsumer {
  @Process('export-job')
  processExport(job: Job<unknown>) {
    console.log(job.data);
    return 'completed';
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job, result: any) {
    console.log(job, result);
  }
}
