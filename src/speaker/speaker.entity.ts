import { DataLabellingTask } from 'src/data-labelling-task/data-labelling-task.entity';
import { SpeakerResource } from 'src/speaker-resource/speaker-resource.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  accent: string;

  @Column()
  emotion: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (u) => u.managing_speakers, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany((type) => DataLabellingTask, (t) => t.speaker)
  assigned_tasks: DataLabellingTask[];

  @OneToMany((type) => SpeakerResource, (r) => r.speaker)
  resources: SpeakerResource[];
}
