import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
const jwtSecret = process.env.SECRET_KEY;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new HttpException(
          'auth token not provided',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const decoded: any = jwt.verify(token, jwtSecret);
      req.body.email = decoded.email;
      next();
    } catch (error) {
      res.status(401).send('Please authenticate');
    }
  }
}
