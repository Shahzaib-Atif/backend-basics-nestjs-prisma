import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepo } from './UserRepo';
const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

@Injectable()
export class TaskRepo {
  constructor(readonly userRepo: UserRepo) {}
  async add(name: string, userEmail: string) {
    try {
      const user = await this.userRepo.fetchByEmail(userEmail);
      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);

      return await prisma.task.create({
        data: {
          name,
          user: {
            connectOrCreate: {
              where: {
                email: userEmail,
              },
              create: {
                email: 'UserNotFound@prisma.io',
                password: 'password', // default password (but this conditon won't arise)
              },
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `An error occured while adding new task. ${error}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async fetchAllTasks(userEmail: string) {
    try {
      return await prisma.task.findMany({
        skip: 0, // start from this number
        take: 20, // limit
        where: {
          user: {
            email: userEmail,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `An error occured while fetching tasks. ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
