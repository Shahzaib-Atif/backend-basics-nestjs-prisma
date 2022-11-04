import { HttpException, HttpStatus } from '@nestjs/common';
import { z, ZodError } from 'zod';

export interface FetchUserI {
  email: string;
}

export class FetchUserDto implements FetchUserI {
  constructor(readonly email: string) {}

  private static readonly schema = z.object({
    email: z.string().email(),
  });

  static create(data: object) {
    try {
      const { email } = FetchUserDto.schema.parse(data);
      return new FetchUserDto(email);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = JSON.stringify(err.issues);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('validation error', HttpStatus.BAD_REQUEST);
    }
  }
}
