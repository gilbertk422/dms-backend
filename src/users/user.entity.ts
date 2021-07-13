import { VoiceArtistTask } from 'src/voiceartisttask/voiceartisttask.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(type => VoiceArtistTask, t => t.user)
  managing_tasks: VoiceArtistTask[];

  @OneToMany(type => VoiceArtistTask, t => t.manager)
  assigned_tasks: VoiceArtistTask[];
}

export type IUserRequest = Request & { user: User };
