import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import config from '../../config';

@Injectable()
export class S3ManagerService {
  private readonly Bucket = config.aws.s3BucketName;
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async deleteObject(key: string) {
    await this.s3.deleteObject({ Bucket: this.Bucket, Key: key }).promise();
  }

  async getSignedUrl(key: string, contentType: string) {
    return await this.s3.getSignedUrlPromise('putObject', {
      Bucket: this.Bucket,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
    });
  }
}
