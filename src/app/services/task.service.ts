import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/task/CreateTaskDto';
import { TaskRepo } from 'src/infra/TaskRepo';
import { ListTasksDto } from '../dtos/task/ListTasksDto';

@Injectable()
export class TaskService {
  async createTask(dto: CreateTaskDto): Promise<any> {
    const { name, userEmail } = dto;
    const task = await TaskRepo.add(name, userEmail);
    return CreateTaskDto.serialize(task);
  }

  async listTasks(dto: ListTasksDto): Promise<any> {
    const { userEmail } = dto;
    const tasks = await TaskRepo.fetchAllTasks(userEmail);
    return ListTasksDto.serialize(tasks);
  }
}
