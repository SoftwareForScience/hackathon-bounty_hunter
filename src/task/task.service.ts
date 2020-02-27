import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { StudentAppliesTaskBodyDto, StudentCreatedTaskBodyDto, TeacherAcceptedTaskBodyDto, TeacherCreatedTaskBodyDto } from './dto';
import { Status, Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor (@InjectRepository(Task)
  private readonly taskRepository: Repository<Task>,
  ) { }

  async getAll () {
    return this.taskRepository.find();
  }

  async createTask (task: TeacherCreatedTaskBodyDto) {
    return this.taskRepository.save(task);
  }

  async requestTask (task: StudentCreatedTaskBodyDto) {
    return this.taskRepository.save(task);
  }

  async acceptAssesing (teacher, task: TeacherAcceptedTaskBodyDto): Promise<Task> {
    const dbTask = await this.taskRepository.findOne(task.taskId);
    if (!dbTask) {
      throw new NotFoundException(`Task with id: ${task.taskId.toLocaleString()} not found`);
    }

    dbTask.assessor = { id: teacher.userId } as any as User;
    dbTask.status = Status.Occupied;
    return this.taskRepository.save(dbTask);
  }

  async apply (student, task: StudentAppliesTaskBodyDto): Promise<Task> {
    const dbTask = await this.taskRepository.findOne(task.taskId);
    if (!dbTask) {
      throw new NotFoundException(`Task with id: ${task.taskId.toLocaleString()} not found`);
    }

    dbTask.student = { id: student.userId } as any as User;
    dbTask.status = Status.Occupied;
    return this.taskRepository.save(task);
  }
}
