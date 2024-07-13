import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClsService } from 'nestjs-cls';
import { CustomLoggingService } from '../logger/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    private logger: CustomLoggingService,
    private readonly clsService: ClsService,
  ) {}

  use(req: Request, res: any, next: () => void) {
    this.clsService.set('startTimestamp', new Date().getTime());
    this.clsService.set('reqId', randomUUID());

    next();
  }
}
