import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from '@prisma/client';
import { z, ZodError } from 'zod';

export interface CreateTaskI {
  name: string;
  userEmail: string;
}

export class CreateTaskDto implements CreateTaskI {
  constructor(readonly name: string, readonly userEmail: string) {}

  private static readonly schema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  static create(data: object) {
    try {
      const { name, email } = CreateTaskDto.schema.parse(data);
      return new CreateTaskDto(name, email);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = JSON.stringify(err.issues);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('validation error', HttpStatus.BAD_REQUEST);
    }
  }

  static serialize(task: Task) {
    delete task.createdAt;
    delete task.updatedAt;
    delete task.userId;
    return {
      task,
    };
  }
}
