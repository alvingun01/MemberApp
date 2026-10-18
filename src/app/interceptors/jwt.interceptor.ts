import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageKey } from '../models/Enums';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(StorageKey.Token);

  // Clone the request and add the absolute authorization header if the token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
