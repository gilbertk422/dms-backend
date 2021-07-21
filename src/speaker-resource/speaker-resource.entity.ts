import { Speaker } from 'src/speaker/speaker.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SpeakerResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transcription: string;

  @Column()
  audio: string;

  @Column()
  emotion: string;

  @Column()
  status: string;

  @Column()
  notes: string;

  @Column()
  accent: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Speaker, (s) => s.resources, { cascade: true, onDelete: 'CASCADE' })
  speaker: Speaker;
}
