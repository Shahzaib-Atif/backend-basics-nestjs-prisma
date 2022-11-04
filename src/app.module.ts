import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './web/controllers/user.controller';
import { UserService } from './app/services/user.service';
import { LoggerMiddleware } from './web/authMiddleware';
import { TaskController } from './web/controllers/task.controller';
import { TaskService } from './app/services/task.service';

@Module({
  imports: [],
  controllers: [UserController, TaskController],
  providers: [UserService, TaskService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: '/getUser', method: RequestMethod.GET },
        { path: '/create-task', method: RequestMethod.POST },
        { path: '/list-tasks', method: RequestMethod.GET },
      );
  }
}
