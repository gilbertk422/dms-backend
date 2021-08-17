import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { IJob } from './export.producer.service';
import * as archiver from 'archiver';
import * as os from 'os';
import config from 'src/config';

const createTempDir = (dir = '') => {
  const tempDir = path.join(process.cwd(), 'workDir', dir ? dir : uuidv4());
  console.log('creating temp folder', tempDir);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  return tempDir;
};

const removeTempDir = (tempDir) => {
  var deleteFolderRecursive = function (dPath) {
    if (fs.existsSync(dPath)) {
      fs.readdirSync(dPath).forEach(function (file, index) {
        var curPath = path.join(dPath, file);
        if (fs.lstatSync(curPath).isDirectory()) deleteFolderRecursive(curPath);
        else fs.unlinkSync(curPath);
      });
      fs.rmdirSync(dPath);
    }
  };

  deleteFolderRecursive(tempDir);
};

const zip = (srcDir, filePath) => {
  return new Promise((resolve, reject) => {
    var output = fs.createWriteStream(`${filePath}`);
    var archive = archiver('zip');

    output.on('close', function () {
      resolve(filePath);
    });

    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(srcDir, false);
    archive.finalize();
  });
};

@Processor('export-queue')
export class ExportConsumer {
  constructor(private s3ManagerService: S3ManagerService) {}
  @Process('export-job')
  async processExport(job: Job<IJob>) {
    const tempSrcDir = createTempDir();
    const tempDestDir = createTempDir();
    for (const resource of job.data.resources) {
      await this.s3ManagerService.download(tempSrcDir, resource.audio);
      await fs.writeFileSync(
        path.join(tempSrcDir, 'labels.txt'),
        `${path.basename(resource.audio)}|${resource.transcription}${os.EOL}`,
        { flag: 'a' },
      );
    }

    await zip(tempSrcDir, `${tempDestDir}/${job.data.exportKey}`);
    await this.s3ManagerService.upload(
      `${tempDestDir}/${job.data.exportKey}`,
      `${config.prefix}/workdir/export/${job.data.exportKey}`,
    );

    removeTempDir(tempSrcDir);
    removeTempDir(tempDestDir);
    return 'completed';
  }
}
