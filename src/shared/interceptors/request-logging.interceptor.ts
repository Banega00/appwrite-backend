import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable, tap } from 'rxjs';
import { CustomLoggingService } from '../logger/logger.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(
    private logger: CustomLoggingService,
    private readonly clsService: ClsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request)
      this.logger.log(`${request.method} ${request.url}`, {
        label: 'Request start',
      });

    return next.handle().pipe(
      tap((data) => {
        if (response)
          this.logger.log(
            `${Date.now() - this.clsService.get('startTimestamp')}msec |${request.method} ${request.url} | status: ${response.statusCode}`,
            {
              label: 'Request end',
            },
          );
      }),
    );
  }
}
