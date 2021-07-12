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

  @Column()
  user_id: string;

  @Column()
  manager_id: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'manager_id', referencedColumnName: 'id' })
  manager: User;
}
