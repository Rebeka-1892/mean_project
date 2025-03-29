import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(tap(event => {
    if (event instanceof HttpResponse) {
      const redirectUrl = event.headers.get('X-Redirect');
      if (redirectUrl) {
        router.navigate([redirectUrl]);
      }
    }
  }));
};
