import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStorageService } from '@app/auth/services/auth-storage.service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService: AuthStorageService = inject(AuthStorageService);
  const token: string | null = storageService.getUser()?.token || null;

  const modifiedReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  });
  return next(modifiedReq);
};
