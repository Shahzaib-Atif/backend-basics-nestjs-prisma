import { HttpException, HttpStatus } from '@nestjs/common';
import { z, ZodError } from 'zod';

export interface LoginUserI {
  email: string;
  password: string;
}

export class LoginUserDto implements LoginUserI {
  constructor(readonly email: string, readonly password: string) {}

  private static readonly schema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });

  static create(data: object) {
    try {
      const { email, password } = LoginUserDto.schema.parse(data);
      return new LoginUserDto(email, password);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = JSON.stringify(err.issues);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('validation error', HttpStatus.BAD_REQUEST);
    }
  }
}
