import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Speaker } from 'src/speaker/speaker.entity';
import { VoiceArtistTask } from 'src/voice-artist-task/voice-artist-task.entity';
import { DataLabellingTask } from 'src/data-labelling-task/data-labelling-task.entity';
import { SpeakerResource } from 'src/speaker-resource/speaker-resource.entity';
import { VoiceArtistTaskResource } from 'src/voice-artist-task-resource/voice-artist-task-resource.entity';
import { DataLabellingTaskResource } from 'src/data-labelling-task-resource/data-labelling-task-resource.entity';

export class StartExportDto {
  @ApiProperty()
  @IsString()
  type: string; // "speaker" | "voice-artist-task" | "data-labelling-task" | "speaker-resources" | "voice-artist-task-resources" | "data-labelling-task-resources"

  @ApiProperty()
  @IsOptional()
  speaker: Speaker;

  @ApiProperty()
  @IsOptional()
  voiceArtistTask: VoiceArtistTask;

  @ApiProperty()
  @IsOptional()
  dataLabellingTask: DataLabellingTask;

  @ApiProperty()
  @IsOptional()
  speakerResources: SpeakerResource[];

  @ApiProperty()
  @IsOptional()
  voiceArtistTaskResources: VoiceArtistTaskResource[];

  @ApiProperty()
  @IsOptional()
  dataLabellingTaskResources: DataLabellingTaskResource[];
}
