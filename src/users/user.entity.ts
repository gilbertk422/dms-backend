import { Speaker } from 'src/speaker/speaker.entity';
import { VoiceArtistTask } from 'src/voice-artist-task/voice-artist-task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @OneToMany((type) => VoiceArtistTask, (t) => t.user)
  managing_tasks: VoiceArtistTask[];

  @OneToMany((type) => VoiceArtistTask, (t) => t.manager)
  assigned_tasks: VoiceArtistTask[];

  @OneToMany((type) => Speaker, (t) => t.user)
  managing_speakers: Speaker[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export type IUserRequest = Request & { user: User };
