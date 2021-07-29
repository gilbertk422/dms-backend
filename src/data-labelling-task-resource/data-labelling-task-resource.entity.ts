import { DataLabellingTask } from 'src/data-labelling-task/data-labelling-task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DataLabellingTaskResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transcription: string;

  @Column()
  audio: string;

  @Column()
  emotion: string;

  @Column()
  accent: string;

  @Column()
  gender: string;

  @Column()
  emotion_tagged: boolean;

  @Column()
  transcribed: boolean;

  @Column()
  verified: boolean;

  @Column()
  reported: boolean;

  @Column()
  notes: string;

  @Column()
  speaker_resource_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => DataLabellingTask, (t) => t.resources, { cascade: true, onDelete: 'CASCADE' })
  task: DataLabellingTask;
}
