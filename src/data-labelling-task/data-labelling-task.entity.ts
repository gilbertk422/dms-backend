import { DataLabellingTaskResource } from 'src/data-labelling-task-resource/data-labelling-task-resource.entity';
import { Speaker } from 'src/speaker/speaker.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class DataLabellingTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  task_type: string;

  @Column()
  assign_type: string;

  @Column()
  due_date: Date;

  @Column()
  status: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Speaker, (u) => u.assigned_tasks)
  @JoinColumn()
  speaker: Speaker;

  @ManyToOne(() => User, (u) => u.managing_tasks, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'manager_data_labelling_task',
    joinColumn: { name: 'manager_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' },
  })
  managers: User[];

  @OneToMany(() => DataLabellingTaskResource, (r) => r.task)
  resources: DataLabellingTaskResource[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
