import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/user.create.dto';
import { S3ManagerService } from './aws/s3/s3-manager.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as mime from 'mime-types';
import { UploadDto } from './users/dto/upload.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private s3ManagerService: S3ManagerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('auth/me')
  getIdentity(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async upload(@Body() uploadDto: UploadDto) {
    const resultKey = `${uuidv4()}${path.extname(uploadDto.filename)}`;
    const uploadURL = await this.s3ManagerService.getSignedUrl(resultKey, mime.lookup(resultKey));
    return { resultKey, uploadURL };
  }

  getHello() {
    return 'Hello World!';
  }
}
