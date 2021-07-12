import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VoiceArtistTasksModule } from './voiceartisttask/voiceartisttasks.module';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dms.cqmwuwygpmg4.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'Alethea2021!',
      database: 'dms',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
