import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class VoiceArtistTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  speaker_name: string;

  @Column()
  due_date: Date;

  @Column()
  status: string;

  @Column()
  accent: string;

  @Column()
  gender: string;

  @Column()
  emotion: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, u => u.managing_tasks)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, u => u.assigned_tasks)
  @JoinColumn()
  manager: User;
}
