import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const accessToken = cookieService.get('accessToken');
  if (accessToken) {
    inject(Router).navigateByUrl('/admin/employees');
  }
  return true;
};
