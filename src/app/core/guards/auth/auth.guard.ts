import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!inject(CookieService).get('accessToken')) {
    inject(Router).navigateByUrl('/');
  }
  return true;
};
