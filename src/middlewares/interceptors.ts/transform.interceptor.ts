import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;

        if (statusCode >= 400) {
          // Error response
          return {
            statusCode,
            message: 'Error',
            error: data instanceof Error ? data.message : data,
          };
        } else {
          // Success response
          return {
            statusCode,
            message: 'Success',
            data,
          };
        }
      }),
    );
  }
}
