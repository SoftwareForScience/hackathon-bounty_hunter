import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Task, task => task.student)
  tasks: Task;

  @OneToMany(type => Task, task => task.assessor)
  assessings: Task;
}
