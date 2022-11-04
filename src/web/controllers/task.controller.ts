import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto, CreateTaskI } from 'src/app/dtos/task/CreateTaskDto';
import { ListTasksDto, ListTasksI } from 'src/app/dtos/task/ListTasksDto';
import { TaskService } from 'src/app/services/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create-task')
  async register(@Body() body: CreateTaskI): Promise<any> {
    const dto = CreateTaskDto.create(body);
    return this.taskService.createTask(dto);
  }

  @Get('/list-tasks')
  async getUser(@Body() body: ListTasksI): Promise<any> {
    const dto = ListTasksDto.create(body);
    return this.taskService.listTasks(dto);
  }
}
