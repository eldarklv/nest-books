import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs';

@Injectable()
export class ExtendBody implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return { status: 'succes', data };
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const status = error.getStatus();
        response.status(status);

        return of({
          status: 'fail',
          data: error,
        });
      }),
    );
  }
}
