import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoiceArtistTasksModule } from './voiceartisttask/voiceartisttasks.module';
import { DataLabellingTasksModule } from './datalabellingtask/datalabellingtask.module';
import { SpeakersModule } from './speaker/speaker.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3ManagerModule } from './aws/s3/s3-manager.module';
import { S3 } from 'aws-sdk';
import config from './config';

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
    AuthModule,
    UsersModule,
    VoiceArtistTasksModule,
    DataLabellingTasksModule,
    SpeakersModule,
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
