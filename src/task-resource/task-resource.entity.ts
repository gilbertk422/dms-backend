import { VoiceArtistTask } from 'src/voice-artist-task/voice-artist-task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TaskResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transcription: string;

  @Column()
  audio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => VoiceArtistTask, (t) => t.resources, { cascade: true, onDelete: 'CASCADE' })
  task: VoiceArtistTask;
}
