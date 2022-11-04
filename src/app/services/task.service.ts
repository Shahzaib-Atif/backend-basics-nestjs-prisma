import { Injectable } from '@nestjs/common';
import { TaskRepo } from 'src/infra/TaskRepo';
import { CreateTaskDto } from '../dtos/task/CreateTaskDto';
import { ListTasksDto } from '../dtos/task/ListTasksDto';

@Injectable()
export class TaskService {
  constructor(readonly taskRepo: TaskRepo) {}
  async createTask(dto: CreateTaskDto): Promise<any> {
    const { name, userEmail } = dto;
    const task = await this.taskRepo.add(name, userEmail);
    return CreateTaskDto.serialize(task);
  }

  async listTasks(dto: ListTasksDto): Promise<any> {
    const { userEmail } = dto;
    const tasks = await this.taskRepo.fetchAllTasks(userEmail);
    return ListTasksDto.serialize(tasks);
  }
}
