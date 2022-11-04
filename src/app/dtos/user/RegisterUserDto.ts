import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { z, ZodError } from 'zod';

export interface RegisterUserI {
  email: string;
  password: string;
}

export class RegisterUserdDto implements RegisterUserI {
  constructor(readonly email: string, readonly password: string) {}

  private static readonly schema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });

  static create(data: object) {
    try {
      const { email, password } = RegisterUserdDto.schema.parse(data);
      return new RegisterUserdDto(email, password);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = JSON.stringify(err.issues);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('validation error', HttpStatus.BAD_REQUEST);
    }
  }

  static serialize(user: User) {
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }
}
