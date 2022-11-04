import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

@Injectable()
export class UserRepo {
  async add(email: string, password: string) {
    try {
      return await prisma.user.create({
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      throw new HttpException(
        `An error occured while adding new user. ${error}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async fetchByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        `An error occured while fetching user. ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
