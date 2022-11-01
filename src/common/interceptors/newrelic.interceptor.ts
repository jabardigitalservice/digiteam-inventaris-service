import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import newrelic from 'newrelic';

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as Request;

    const message = `method: ${req.method}, path: ${req.originalUrl}`;
    this.logger.log({ message, context: context.getHandler().name });

    return newrelic.startWebTransaction(req.originalUrl, function () {
      const transaction = newrelic.getTransaction();
      return next.handle().pipe(
        tap(() => {
          return transaction.end();
        }),
      );
    });
  }
}
