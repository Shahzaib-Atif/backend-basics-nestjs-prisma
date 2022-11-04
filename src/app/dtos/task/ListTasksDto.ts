import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from '@prisma/client';
import { z, ZodError } from 'zod';

export interface ListTasksI {
  userEmail: string;
}

export class ListTasksDto implements ListTasksI {
  constructor(readonly userEmail: string) {}

  private static readonly schema = z.object({
    email: z.string().email(),
  });

  static create(data: object) {
    try {
      const { email } = ListTasksDto.schema.parse(data);
      return new ListTasksDto(email);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = JSON.stringify(err.issues);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('validation error', HttpStatus.BAD_REQUEST);
    }
  }

  static serialize(tasks: Task[]) {
    // serialize each array element
    const tasksSerialized = tasks.map((task) => {
      delete task.createdAt;
      delete task.updatedAt;
      delete task.userId;
      return task;
    });
    return { tasks: tasksSerialized };
  }
}
