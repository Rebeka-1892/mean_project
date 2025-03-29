import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(tap(event => {
    if (event instanceof HttpResponse) {
      const redirectUrl = event.headers.get('X-Redirect');
      if (redirectUrl) {
        router.navigate([redirectUrl]);
      }
    }
  }));
}
