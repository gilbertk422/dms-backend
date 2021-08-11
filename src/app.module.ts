import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoiceArtistTasksModule } from './voice-artist-task/voice-artist-tasks.module';
import { VoiceArtistTaskResourcesModule } from './voice-artist-task-resource/voice-artist-task-resources.module';
import { DataLabellingTaskResourcesModule } from './data-labelling-task-resource/data-labelling-task-resources.module';
import { DataLabellingTasksModule } from './data-labelling-task/data-labelling-tasks.module';
import { SpeakersModule } from './speaker/speakers.module';
import { SpeakerResourcesModule } from './speaker-resource/speaker-resources.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3ManagerModule } from './aws/s3/s3-manager.module';
import { S3 } from 'aws-sdk';
import config from './config';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    S3ManagerModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: config.aws.region,
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
      services: [S3],
    }),
    ExportModule,
    AuthModule,
    UsersModule,
    VoiceArtistTasksModule,
    DataLabellingTasksModule,
    VoiceArtistTaskResourcesModule,
    DataLabellingTaskResourcesModule,
    SpeakersModule,
    SpeakerResourcesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
