import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

export enum Status {
  Open = 'OPEN',
  Requested = 'REQUESTED',
  Occupied = 'OCCUPIED',
  Completed = 'COMPLETED',
  Closed = 'CLOSED',
}

export class CreateTaskBodyDto {
  @ApiProperty({ minLength: 3 })
  title: string;

  @ApiProperty()
  discription: string;
}

export class TeacherCreatedTaskBodyDto extends CreateTaskBodyDto {
  @ApiProperty()
  ecs: number;

  assessor: User;

  @ApiProperty({ required: false })
  status: Status;
}

export class StudentCreatedTaskBodyDto extends CreateTaskBodyDto {
  @ApiProperty({ required: false })
  ecs: number;

  student: User;

  status = Status.Requested;
}

export class TeacherAcceptedTaskBodyDto {
  @ApiProperty()
  taskId: number;

  assessor: User;
}
