import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum Status {
  Open = 'OPEN',
  Requested = 'REQUESTED',
  Occupied = 'OCCUPIED',
  Completed = 'COMPLETED',
  Closed = 'CLOSED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  discription: string;

  @Column()
  ecs: number;

  @Column()
  status: Status;

  @ManyToOne(type => User, user => user.tasks)
  student: User;

  @ManyToOne(type => User, user => user.assessings)
  assessor: User;
}
