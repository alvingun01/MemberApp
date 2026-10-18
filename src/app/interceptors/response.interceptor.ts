import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { DefaultResponse } from '../models/Shared';
import { StatusCode } from '../models/Enums';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('Success Body:', event.body);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.log('error', error);
      console.log('event response');
      const responseBody = error.error as DefaultResponse;
      if (responseBody.status_code !== StatusCode.Success) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
